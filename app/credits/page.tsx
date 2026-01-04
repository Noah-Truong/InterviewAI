'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { CoinIcon } from '../../components/Icons';

export default function CreditsPage() {
  const [credits, setCredits] = useState(150);

  const purchaseCredits = (amount: number, price: number) => {
    setCredits(credits + amount);
    alert(`Purchased ${amount} credits for $${price}!`);
  };

  const creditPackages = [
    { credits: 50, price: 9.99 },
    { credits: 100, price: 17.99 },
    { credits: 250, price: 39.99 },
    { credits: 500, price: 69.99 },
  ];

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
              <CoinIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Extra Credits</h1>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Credits</p>
                  <p className="text-4xl font-bold text-gray-900">{credits}</p>
                </div>
                <CoinIcon className="w-16 h-16 text-purple-600" />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How Credits Work</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Use credits to unlock premium features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>1 credit = 1 AI mock interview session</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>5 credits = 1 resume review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Credits never expire</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Purchase Credits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.credits}
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{pkg.credits}</p>
                        <p className="text-sm text-gray-600">Credits</p>
                      </div>
                      <p className="text-xl font-semibold text-purple-600">${pkg.price}</p>
                    </div>
                    <button
                      onClick={() => purchaseCredits(pkg.credits, pkg.price)}
                      className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Purchase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

