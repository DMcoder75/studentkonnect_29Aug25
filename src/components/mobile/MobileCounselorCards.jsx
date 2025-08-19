import React from 'react';

const MobileCounselorCards = () => {
  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Academic Counselor",
      experience: "8y exp",
      specialization: ["Computer Science", "Engineering"],
      rating: 4.9,
      reviews: 18,
      description: "Experienced Computer Science counselor specializing in AI and Software Engineering. Passionate about helping students achieve their academic goals in technology fields.",
      helped: 23,
      successRate: 95,
      languages: ["English", "Mandarin"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Emma Wilson",
      title: "Academic Counselor",
      experience: "10y exp",
      specialization: ["Medicine", "Health Sciences"],
      rating: 4.8,
      reviews: 12,
      description: "Medical education specialist with a decade of experience in health sciences. Dedicated to guiding aspiring healthcare professionals through their academic journey.",
      helped: 15,
      successRate: 93,
      languages: ["English"],
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Kumar",
      title: "Career Counselor",
      experience: "6y exp",
      specialization: ["Business", "Finance"],
      rating: 4.7,
      reviews: 15,
      description: "Business and Finance expert with extensive experience in MBA programs and career guidance. Helping students navigate their path to business success.",
      helped: 18,
      successRate: 89,
      languages: ["English", "Hindi"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. Lisa Zhang",
      title: "Academic Counselor",
      experience: "12y exp",
      specialization: ["Law", "International Relations"],
      rating: 4.9,
      reviews: 25,
      description: "International law specialist with expertise in global university admissions. Helping students pursue legal careers worldwide.",
      helped: 32,
      successRate: 97,
      languages: ["English", "Chinese", "French"],
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="md:hidden py-6">
      {/* Section Header */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Find Your Perfect Counselor
        </h2>
        <p className="text-gray-600 text-sm">
          Connect with experienced education counselors who understand your unique journey and goals. 
          Get personalized guidance for your university applications and career planning.
        </p>
      </div>

      {/* Horizontal Scrolling Cards */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-4 pb-4">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className="flex-none w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {counselor.title}
                      </span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">{counselor.rating}</span>
                        <span className="text-xs text-gray-500">({counselor.reviews} reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{counselor.name}</h3>
                    <p className="text-sm text-gray-600">{counselor.experience}</p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {counselor.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {counselor.description}
                </p>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{counselor.helped}</div>
                    <div className="text-xs text-gray-500">helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{counselor.successRate}%</div>
                    <div className="text-xs text-gray-500">success</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500">Languages: </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {counselor.languages.join(', ')}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-purple-700 transition-colors">
                    Message
                  </button>
                  <button className="flex-1 bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-medium text-sm hover:bg-purple-200 transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="px-4 mt-4">
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
          View All Counselors →
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MobileCounselorCards;

