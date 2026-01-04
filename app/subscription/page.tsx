'use client';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { StarIcon } from '../../components/Icons';

export default function SubscriptionPage() {
  const handleUpgrade = (plan: string) => {
    alert(`Upgrading to ${plan} plan...`);
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Basic job search',
        'Up to 5 saved jobs',
        'Limited mock interviews',
      ],
    },
    {
      name: 'Premium',
      price: '$19',
      period: '/month',
      features: [
        'Unlimited job search',
        'Unlimited saved jobs',
        'Unlimited mock interviews',
        'Priority support',
        'Advanced filtering',
      ],
      popular: true,
    },
    {
      name: 'Pro',
      price: '$39',
      period: '/month',
      features: [
        'Everything in Premium',
        'AI resume review',
        'Career coaching sessions',
        'Interview preparation tools',
        'Job application tracking',
      ],
    },
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
            </div>
            <p className="text-gray-700">Choose the plan that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg border-2 p-6 ${
                  plan.popular
                    ? 'border-purple-600 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full font-semibold py-2 px-6 rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

