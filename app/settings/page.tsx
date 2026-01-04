'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { SettingsIcon } from '../../components/Icons';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    marketingEmails: false,
    darkMode: false,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
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
              <SettingsIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Job Alerts</span>
                    <input
                      type="checkbox"
                      checked={settings.jobAlerts}
                      onChange={(e) => setSettings({ ...settings, jobAlerts: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Marketing Emails</span>
                    <input
                      type="checkbox"
                      checked={settings.marketingEmails}
                      onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Appearance</h2>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-700">Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>
              </div>

              <button
                onClick={handleSave}
                className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

