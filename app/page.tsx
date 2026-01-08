'use client';

import { useState, useMemo } from 'react';
import { Job } from '../types';
import { mockJobs } from '../data/mockJobs';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import JobCard from '../components/JobCard';
import PromotionalSidebar from '../components/PromotionalSidebar';
import JobDetailView from '../components/JobDetailView';
import JobFitSidebar from '../components/JobFitSidebar';

type SortMethod = 'match' | 'applicants' | 'salary' | 'date';

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeFilter, setActiveFilter] = useState<'Matched' | 'Liked' | 'Applied'>('Matched');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [sortMethod, setSortMethod] = useState<SortMethod>('match');

  const handleApply = (job: Job) => {
    // Update the job's applied status
    setJobs(prevJobs =>
      prevJobs.map(j =>
        j.id === job.id ? { ...j, applied: true } : j
      )
    );
    alert(`Application for ${job.title} at ${job.company} would be submitted here!`);
  };

  const handleMockInterview = (job: Job) => {
    alert(`Starting mock interview for ${job.title} at ${job.company}!`);
  };

  const handleLikeToggle = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(j =>
        j.id === jobId ? { ...j, liked: !j.liked } : j
      )
    );
  };

  const handleChangeJobReference = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`Job reference updated! Processing ${file.name}...`);
        // Here you would typically upload the file and update match percentages
      }
    };
    input.click();
  };

  const handleSortToggle = () => {
    const sortMethods: SortMethod[] = ['match', 'applicants', 'salary', 'date'];
    const currentIndex = sortMethods.indexOf(sortMethod);
    const nextIndex = (currentIndex + 1) % sortMethods.length;
    setSortMethod(sortMethods[nextIndex]);
  };

  const parseSalary = (salary: string): number => {
    // Extract first number from salary string and handle K suffix
    // Examples: "$90K/yr - $130K/yr" -> 90000, "$120,000 - $160,000" -> 120000
    const match = salary.match(/\$?([\d,]+)(K|k)?/);
    if (match) {
      const number = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = match[2];
      return suffix ? number * 1000 : number;
    }
    return 0;
  };

  const parseDate = (dateStr: string): number => {
    // Convert date string to timestamp (assuming format like "2 days ago" or ISO date)
    // For simplicity, using current time minus days if format is "X days ago"
    const daysMatch = dateStr.match(/(\d+)\s+days?\s+ago/);
    if (daysMatch) {
      return Date.now() - parseInt(daysMatch[1], 10) * 24 * 60 * 60 * 1000;
    }
    return new Date(dateStr).getTime();
  };

  // Count liked and applied jobs
  const likedCount = useMemo(() => jobs.filter(job => job.liked).length, [jobs]);
  const appliedCount = useMemo(() => jobs.filter(job => job.applied).length, [jobs]);

  // Filter and sort jobs based on active filter and sort method
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];
    
    if (activeFilter === 'Liked') {
      filtered = filtered.filter(job => job.liked === true);
    } else if (activeFilter === 'Applied') {
      filtered = filtered.filter(job => job.applied === true);
    }
    // 'Matched' shows all jobs
    
    // Sort based on selected method
    return filtered.sort((a, b) => {
      switch (sortMethod) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'applicants':
          return (a.applicants || 0) - (b.applicants || 0); // Lower is better (less competition)
        case 'salary':
          return parseSalary(b.salary) - parseSalary(a.salary); // Higher is better
        case 'date':
          return parseDate(b.postedDate) - parseDate(a.postedDate); // Newer is better
        default:
          return b.matchPercentage - a.matchPercentage;
      }
    });
  }, [jobs, activeFilter, sortMethod]);

  // Get the selected job from the current jobs state
  const currentSelectedJob = selectedJob ? jobs.find(j => j.id === selectedJob.id) || selectedJob : null;

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Sidebar - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          likedCount={likedCount}
          appliedCount={appliedCount}
          onNavigateHome={() => setSelectedJob(null)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 overflow-y-auto bg-gray-50">
          {/* Central Content Area */}
          <section className="flex-1 min-w-0">
            {currentSelectedJob ? (
              <JobDetailView
                job={currentSelectedJob}
                onBack={() => setSelectedJob(null)}
                onApply={() => handleApply(currentSelectedJob)}
                onLikeToggle={() => handleLikeToggle(currentSelectedJob.id)}
              />
            ) : (
              <>
                {/* Top Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-3">
                  <button
                    onClick={handleChangeJobReference}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-sm flex-1 sm:flex-initial"
                    style={{ backgroundColor: '#A68BFA' }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="truncate">Change Job Reference</span>
                  </button>
                  <button
                    onClick={handleSortToggle}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="hidden xs:inline">
                      {sortMethod === 'match' && 'Top matched'}
                      {sortMethod === 'applicants' && 'Fewest applicants'}
                      {sortMethod === 'salary' && 'Highest salary'}
                      {sortMethod === 'date' && 'Newest first'}
                    </span>
                    <span className="xs:hidden">
                      {sortMethod === 'match' && 'Match'}
                      {sortMethod === 'applicants' && 'Applicants'}
                      {sortMethod === 'salary' && 'Salary'}
                      {sortMethod === 'date' && 'Date'}
                    </span>
                  </button>
                </div>

                {/* Job Listings */}
                {filteredJobs.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No {activeFilter.toLowerCase()} jobs found
                    </h3>
                    <p className="text-gray-600">
                      {activeFilter === 'Liked' 
                        ? 'Start liking jobs to see them here!'
                        : activeFilter === 'Applied'
                        ? 'You haven\'t applied to any jobs yet.'
                        : 'No jobs available.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onClick={() => setSelectedJob(job)}
                        onApply={() => handleApply(job)}
                        onMockInterview={() => handleMockInterview(job)}
                        onLikeToggle={() => handleLikeToggle(job.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Right Sidebar - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            {currentSelectedJob ? (
              <JobFitSidebar job={currentSelectedJob} />
            ) : (
              <PromotionalSidebar />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
