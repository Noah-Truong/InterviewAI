'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { PlayIcon } from '../../components/Icons';
import Link from 'next/link';
export default function MockInterviewPage() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  const startInterview = () => {
    setIsInterviewActive(true);
    alert('Mock interview session would start here!');
  };

  return (
    <Layout>
      <Header
        activeFilter="Matched"
        onFilterChange={() => {}}
        likedCount={0}
        appliedCount={0}
      />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <PlayIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">AI Mock Interview</h1>
            </div>

            {!isInterviewActive ? (
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Practice your interview skills with our AI-powered mock interview system. 
                  Get personalized feedback and improve your performance.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">How it works:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Select a job position to practice with</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Answer AI-generated interview questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Receive detailed feedback and suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Track your improvement over time</span>
                    </li>
                  </ul>
                </div>

                <Link href='/digital-human'
                  onClick={startInterview}
                  className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  Start Mock Interview
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg mb-4">Interview session in progress...</p>
                <button
                  onClick={() => setIsInterviewActive(false)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  End Session
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

