'use client';

import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply?: () => void;
  onMockInterview?: () => void;
  onClick?: () => void;
  onLikeToggle?: () => void;
}

export default function JobCard({ job, onApply, onMockInterview, onClick, onLikeToggle }: JobCardProps) {
  const liked = job.liked || false;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'percentage-color-green';
    return 'percentage-color-yellow';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return '1 hours ago';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const circumference = 2 * Math.PI * 32; // radius = 32
  const offset = circumference - (job.matchPercentage / 100) * circumference;

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Match Percentage Circle */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20">
            <svg className="transform -rotate-90 w-20 h-20" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={getMatchColor(job.matchPercentage)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-bold text-gray-900">
                {job.matchPercentage}%
              </span>
            </div>
          </div>
          <div className="text-xs text-center mt-1 text-gray-600 font-medium">Match</div>
        </div>

        {/* Job Content */}
        <div className="flex-1">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-gray-700 font-medium">{job.company}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeToggle?.();
                }}
                className={`transition-colors ${liked ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg
                  className="w-5 h-5"
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Location and Work Type */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              {job.workType}
            </span>
          </div>

          {/* Attributes Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
              {job.type}
            </span>
            {job.skillsMatch && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                {job.skillsMatch}
              </span>
            )}
            {job.experience && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                {job.experience}
              </span>
            )}
            {job.level && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                {job.level}
              </span>
            )}
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
              {job.salary}
            </span>
          </div>

          {/* Posting Info */}
          <div className="text-sm text-gray-500 mb-4">
            {getTimeAgo(job.postedDate)} • {job.applicants || 0} applicants
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onApply}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              style={{ borderRadius: '9999px' }}
            >
              Apply
            </button>
            <button
              onClick={onMockInterview}
              className="px-4 py-2 text-gray-700 rounded-lg font-medium transition-colors mock-interview-button"
            >
              Mock Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
