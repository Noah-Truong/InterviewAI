'use client';

import { Job } from '../types';
import { useState } from 'react';

interface JobFitSidebarProps {
  job: Job;
}

export default function JobFitSidebar({ job }: JobFitSidebarProps) {
  const [liked, setLiked] = useState(job.liked || false);

  const matchScores = {
    education: 93,
    workExp: 80,
    skills: 93,
    expLevel: 44,
  };

  const getCircumference = (percentage: number) => {
    const radius = 35;
    return 2 * Math.PI * radius;
  };

  const getOffset = (percentage: number) => {
    const circumference = getCircumference(percentage);
    return circumference - (percentage / 100) * circumference;
  };

  const getColor = (percentage: number) => {
    if (percentage >= 80) return 'percentage-color-green';
    if (percentage >= 60) return 'percentage-color-yellow';
    return 'percentage-color-yellow'; // Use yellow for lower percentages too
  };

  return (
    <aside className="w-80 bg-white rounded-lg border border-gray-200 p-6 flex-shrink-0">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Why is this job a good fit for me?</h3>

      {/* Match Scores Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {Object.entries(matchScores).map(([key, percentage]) => {
          const circumference = getCircumference(percentage);
          const offset = getOffset(percentage);
          const color = getColor(percentage);
          const label = key === 'workExp' ? 'Work Exp' : key === 'expLevel' ? 'Exp. Level' : key.charAt(0).toUpperCase() + key.slice(1);

          return (
            <div key={key} className="flex flex-col items-center">
              <div className="relative w-20 h-20 mb-2">
                <svg className="transform -rotate-90 w-20 h-20" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={color}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-gray-900">{percentage}%</span>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Relevant Experience Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h4 className="font-semibold text-gray-900">Relevant Experience</h4>
        </div>
        <p className="text-sm text-gray-700">
          You have substantial experience as a UI/UX Designer, Interaction Designer, and User Research Specialist. Your role at Sohu aligns with designing interaction elements relevant to user experience design for digital products.
        </p>
      </div>

      {/* Seniority Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h4 className="font-semibold text-gray-900">Seniority</h4>
        </div>
        <p className="text-sm text-gray-700">
          You have amassed over eight years of relevant experience, meeting the mid-level seniority requirement for the role.
        </p>
      </div>

      {/* Education Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h4 className="font-semibold text-gray-900">Education</h4>
        </div>
        <p className="text-sm text-gray-700">
          While you hold a Master's degree from Politecnico di Milano in Digital and Interaction Design, it doesn't strictly align with the specified fields of Computer Science, Computer Engineering, or Information Science and Technology required by the job.
        </p>
      </div>
    </aside>
  );
}

