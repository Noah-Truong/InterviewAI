'use client';

import { Job } from '../types';

interface JobDetailsProps {
  job: Job | null;
  onClose: () => void;
  onApply: () => void;
}

export default function JobDetails({ job, onClose, onApply }: JobDetailsProps) {
  if (!job) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-blue-100 text-blue-800';
      case 'Part-time':
        return 'bg-green-100 text-green-800';
      case 'Contract':
        return 'bg-purple-100 text-purple-800';
      case 'Remote':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-start z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1 pr-4">
            {job.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl font-bold touch-manipulation"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              {job.company}
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="text-base text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(
                  job.type
                )}`}
              >
                {job.type}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Posted on {new Date(job.postedDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Job Description
            </h4>
            <p className="text-base text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Requirements
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="text-base text-gray-700 flex items-start"
                >
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white -mb-6 pb-6">
            <button
              onClick={onApply}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 active:scale-95 transition-all touch-manipulation shadow-md"
            >
              Apply Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none sm:px-8 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 active:scale-95 transition-all touch-manipulation"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

