'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { DocumentIcon } from '../../components/Icons';

export default function ResumePage() {
  const [resumeText, setResumeText] = useState('');

  const handleSave = () => {
    alert('Resume saved successfully!');
  };

  const handleDownload = () => {
    alert('Resume download would be triggered here!');
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
              <DocumentIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Resume
                </label>
                <textarea
                  id="resume"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste or type your resume here..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Resume
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg border border-purple-600 hover:bg-purple-50 transition-colors"
                >
                  Download PDF
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tips for a great resume:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Keep it concise and focused on relevant experience</li>
                  <li>• Use action verbs and quantify your achievements</li>
                  <li>• Tailor your resume to each job application</li>
                  <li>• Proofread carefully for spelling and grammar errors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

