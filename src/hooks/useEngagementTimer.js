import { useState, useEffect, useRef } from 'react';

const useEngagementTimer = (triggerTime = 60000, user = null) => { // 60 seconds default, added user parameter
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // If user is logged in, don't show modal and stop timer
    if (user) {
      setIsActive(false);
      setShouldShowOnboarding(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    const lastTriggerTime = localStorage.getItem('onboarding_last_trigger');
    
    if (hasCompletedOnboarding) {
      setIsActive(false);
      return;
    }

    // Don't trigger again if already triggered in the last 24 hours
    if (lastTriggerTime) {
      const timeSinceLastTrigger = Date.now() - parseInt(lastTriggerTime);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (timeSinceLastTrigger < twentyFourHours) {
        setIsActive(false);
        return;
      }
    }

    // Start the engagement timer only if user is not logged in
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      setTimeSpent(elapsed);

      // Trigger onboarding modal after specified time
      if (elapsed >= triggerTime && !hasTriggeredRef.current) {
        setShouldShowOnboarding(true);
        hasTriggeredRef.current = true;
        localStorage.setItem('onboarding_last_trigger', currentTime.toString());
        clearInterval(intervalRef.current);
      }
    }, 1000);

    // Track user activity to reset timer on interaction
    const resetTimer = () => {
      if (!hasTriggeredRef.current) {
        startTimeRef.current = Date.now();
        setTimeSpent(0);
      }
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [triggerTime, user]); // Added user to dependency array

  // Handle visibility change (tab switching)
  useEffect(() => {
    // Don't handle visibility changes if user is logged in
    if (user) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause timer when tab is not visible
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        // Resume timer when tab becomes visible (only if user is not logged in)
        if (isActive && !hasTriggeredRef.current && !user) {
          startTimeRef.current = Date.now() - timeSpent;
          intervalRef.current = setInterval(() => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTimeRef.current;
            setTimeSpent(elapsed);

            if (elapsed >= triggerTime && !hasTriggeredRef.current) {
              setShouldShowOnboarding(true);
              hasTriggeredRef.current = true;
              localStorage.setItem('onboarding_last_trigger', currentTime.toString());
              clearInterval(intervalRef.current);
            }
          }, 1000);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, timeSpent, triggerTime, user]); // Added user to dependency array

  const markOnboardingCompleted = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_completion_date', Date.now().toString());
    setShouldShowOnboarding(false);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const dismissOnboarding = () => {
    setShouldShowOnboarding(false);
    localStorage.setItem('onboarding_dismissed', Date.now().toString());
    // Don't mark as completed, allow it to trigger again later
  };

  const resetEngagementTimer = () => {
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('onboarding_last_trigger');
    localStorage.removeItem('onboarding_dismissed');
    startTimeRef.current = Date.now();
    setTimeSpent(0);
    hasTriggeredRef.current = false;
    setShouldShowOnboarding(false);
    setIsActive(true);
  };

  const restartTimerOnLogout = () => {
    // Restart the timer when user logs out
    startTimeRef.current = Date.now();
    setTimeSpent(0);
    hasTriggeredRef.current = false;
    setShouldShowOnboarding(false);
    setIsActive(true);
  };

  return {
    shouldShowOnboarding,
    timeSpent,
    isActive,
    markOnboardingCompleted,
    dismissOnboarding,
    resetEngagementTimer,
    restartTimerOnLogout,
    progressPercentage: Math.min((timeSpent / triggerTime) * 100, 100)
  };
};

export default useEngagementTimer;

