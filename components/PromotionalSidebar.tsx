'use client';

import Link from 'next/link';
import { SparkleIcon, MonitorIcon } from './Icons';

export default function PromotionalSidebar() {
  return (
    <aside className="w-full p-6 rounded-lg border border-purple-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-lg -mx-6 -mt-6">
          <div className="absolute inset-0 bg-gradient-ellipse z-0"></div>
          <div className="relative z-10 p-6">
            <SparkleIcon className="w-7 h-7 text-gray-900 mb-2" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Ace Your Interviews with AI-Powered Mock Sessions!
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Struggling with interview nerves or unsure how to prepare? Let our cutting-edge AI mock interviews help you shine!
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Why Choose Our AI Mock Interviews?
            <SparkleIcon className="w-7 h-7 text-gray-900" />
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold">•</span>
              <div>
                <div className="font-medium text-gray-900 mb-1">Job-Specific Simulations</div>
                <div className="text-sm text-gray-600">
                  Practice with questions tailored to your target role, ensuring relevance and preparation.
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold">•</span>
              <div>
                <div className="font-medium text-gray-900 mb-1">Actionable Feedback</div>
                <div className="text-sm text-gray-600">
                  Get detailed analysis of your responses and practical, step-by-step improvement suggestions.
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold">•</span>
              <div>
                <div className="font-medium text-gray-900 mb-1">Boost Success Rates</div>
                <div className="text-sm text-gray-600">
                  Perfect your interview skills and increase your chances of landing the job you want.
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Link href="/mock-interview" className="w-full bg-black text-white font-semibold py-3 px-6 rounded-sides hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 shadow-md">
          <MonitorIcon className="w-5 h-5" />
          Mock Interview
        </Link>
        
      </div>
    </aside>
  );
}
