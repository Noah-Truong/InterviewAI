'use client';

import { Job } from '../types';
import { RobotIcon, iconMap } from './Icons';

interface JobDetailViewProps {
  job: Job;
  onBack: () => void;
  onApply: () => void;
  onLikeToggle?: () => void;
}

export default function JobDetailView({ job, onBack, onApply, onLikeToggle }: JobDetailViewProps) {
  const liked = job.liked || false;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (job.matchPercentage / 100) * circumference;
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'percentage-color-green';
    return 'percentage-color-yellow';
  };
  const matchColor = getMatchColor(job.matchPercentage);

  return (
    <div className="flex-1 min-w-0">
      {/* Job Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-600">{job.applicants || 0} applicants</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button
            onClick={() => onLikeToggle?.()}
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
          <button
            onClick={onApply}
            className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-700 transition-colors"
            style={{ borderRadius: '9999px' }}
         >
            Apply Now
          </button>
        </div>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex gap-6">
          {/* Company Logo */}
          <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {job.company.toLowerCase() === 'google' ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">G</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {job.company.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Job Title and Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{getTimeAgo(job.postedDate)}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-700">{job.company}</p>
              </div>
              {/* Match Percentage Circle */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className={matchColor}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">
                      {job.matchPercentage}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-center mt-1 text-gray-600 font-medium">Match</div>
              </div>
            </div>

            {/* Job Attributes */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                3 days ago
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.workType}
              </div>
              {job.country && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.country}
                </div>
              )}
              {job.experience && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.experience}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.type}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary}
              </div>
              {job.level && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {job.level}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6">
        {/* Job Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
        </div>

        {/* Maximize Interview Success Section */}
        <div className="border border-green-200 p-6"
        style={{ borderRadius: '25px', backgroundColor: ' #B9FD33'}}
        >
          <div className="flex items-start gap-4">
            <div className="text-black flex-shrink-0">
              <RobotIcon className="w-16 h-16" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Maximize your interview success
              </h3>
              <p className="text-gray-700 mb-6">
                Our platform simulates real interview scenarios, helping you refine your responses and boost your confidence.
              </p>
              <div className="border-t border-black my-6 w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Job-Specific Simulations</h4>
                  <p className="text-sm text-gray-600">
                    Practice questions tailored to your target role, ensuring relevance and preparation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Actionable Feedback</h4>
                  <p className="text-sm text-gray-600">
                    Get detailed analysis of your responses and practical, step-by-step improvement suggestions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Boost Success Rates</h4>
                  <p className="text-sm text-gray-600">
                    Perfect your interview skills and increase your chances of landing the job you want.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                style={{ borderRadius: '9999px' }}
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        {job.qualifications && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualification</h3>
            {job.qualifications.introduction && (
              <p className="text-gray-700 mb-6">{job.qualifications.introduction}</p>
            )}
            {job.qualifications.skillTags && job.qualifications.skillTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {job.qualifications.skillTags.map((skill, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
            {job.qualifications.requiredSkills && job.qualifications.requiredSkills.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                <ul className="space-y-2">
                  {job.qualifications.requiredSkills.map((skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {job.qualifications.preferredSkills && job.qualifications.preferredSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Preferred Skills</h4>
                <ul className="space-y-2">
                  {job.qualifications.preferredSkills.map((skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Responsibilities Section */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h3>
            <ul className="space-y-3">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits Section */}
        {job.benefits && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h3>
            {job.benefits.introduction && (
              <p className="text-gray-700 mb-6">{job.benefits.introduction}</p>
            )}
            {job.benefits.items && job.benefits.items.length > 0 && (
              <ul className="space-y-4">
                {job.benefits.items.map((benefit, index) => {
                  const IconComponent = iconMap[benefit.icon];
                  return (
                    <li key={index} className="flex items-start gap-4">
                      <span className="text-gray-600 flex-shrink-0">
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Company Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Company</h3>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-gray-400 text-2xl font-bold">
                {job.company.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{job.company}</h4>
              {job.companyInfo && (
                <div className="space-y-3 text-sm text-gray-600">
                  {job.companyInfo.founded && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Founded in {job.companyInfo.founded}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                  {job.companyInfo.employeeCount && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {job.companyInfo.employeeCount} employees
                    </div>
                  )}
                  {job.companyInfo.website && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-3 mt-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {job.companyInfo?.description && (
            <p className="text-gray-700 leading-relaxed mt-4">{job.companyInfo.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
