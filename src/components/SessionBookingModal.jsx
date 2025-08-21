import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, MessageSquare, FileText } from 'lucide-react';
import { realDatabaseService } from '../services/realDatabaseService';

const SessionBookingModal = ({ isOpen, onClose, student, counselorId }) => {
  const [formData, setFormData] = useState({
    sessionType: 'consultation',
    sessionTitle: '',
    sessionDescription: '',
    scheduledDate: '',
    scheduledTime: '',
    durationMinutes: 60,
    meetingLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const sessionTypes = [
    { value: 'consultation', label: 'Initial Consultation', icon: MessageSquare },
    { value: 'document_review', label: 'Document Review', icon: FileText },
    { value: 'application_help', label: 'Application Assistance', icon: FileText },
    { value: 'interview_prep', label: 'Interview Preparation', icon: Video },
    { value: 'follow_up', label: 'Follow-up Meeting', icon: Phone }
  ];

  const durations = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.sessionTitle || !formData.scheduledDate || !formData.scheduledTime) {
        throw new Error('Please fill in all required fields');
      }

      // Create session data
      const sessionData = {
        studentId: student.id,
        counselorId: counselorId,
        sessionType: formData.sessionType,
        sessionTitle: formData.sessionTitle,
        sessionDescription: formData.sessionDescription,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        durationMinutes: parseInt(formData.durationMinutes),
        meetingLink: formData.meetingLink
      };

      console.log('Creating session with data:', sessionData);

      // Create session in database
      const result = await realDatabaseService.createSession(sessionData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            sessionType: 'consultation',
            sessionTitle: '',
            sessionDescription: '',
            scheduledDate: '',
            scheduledTime: '',
            durationMinutes: 60,
            meetingLink: ''
          });
        }, 2000);
      } else {
        throw new Error(result.error?.message || 'Failed to create session');
      }
    } catch (err) {
      console.error('Error creating session:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule Meeting</h2>
            <p className="text-gray-600 mt-1">
              Book a session with {student?.students?.users?.first_name} {student?.students?.users?.last_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Session scheduled successfully!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  The meeting has been added to both calendars.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Session Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.sessionType === type.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sessionType"
                      value={type.value}
                      checked={formData.sessionType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <IconComponent className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">
                      {type.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Session Title */}
          <div>
            <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Session Title *
            </label>
            <input
              type="text"
              id="sessionTitle"
              name="sessionTitle"
              value={formData.sessionTitle}
              onChange={handleInputChange}
              placeholder="e.g., Initial consultation for MBA application"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Session Description */}
          <div>
            <label htmlFor="sessionDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Session Description
            </label>
            <textarea
              id="sessionDescription"
              name="sessionDescription"
              value={formData.sessionDescription}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe what will be covered in this session..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                id="scheduledTime"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              id="durationMinutes"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          {/* Meeting Link */}
          <div>
            <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Link (Optional)
            </label>
            <input
              type="url"
              id="meetingLink"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              placeholder="https://zoom.us/j/... or https://meet.google.com/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionBookingModal;

