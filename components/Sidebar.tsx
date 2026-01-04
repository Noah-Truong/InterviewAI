'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseIcon, PlayIcon, DocumentIcon, UserIcon, SettingsIcon, StarIcon, CoinIcon } from './Icons';
import logo from '../assets/logo.png';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { id: '/', Icon: BriefcaseIcon, label: 'Jobs' },
    { id: '/mock-interview', Icon: PlayIcon, label: 'AI Mock Interview' },
    { id: '/resume', Icon: DocumentIcon, label: 'Resume' },
    { id: '/profile', Icon: UserIcon, label: 'Profile' },
    { id: '/settings', Icon: SettingsIcon, label: 'Setting' },
    { id: '/subscription', Icon: StarIcon, label: 'Subscription' },
    { id: '/credits', Icon: CoinIcon, label: 'Extra Credits' },
  ];

  return (
    <aside className="bg-white min-h-screen flex flex-col sticky top-0 p-4 border-r border-gray-200 flex-shrink-0" style={{ width: '230px' }}>
      {/* Navigation Items */}
      <div className="flex items-center gap-2 sm:gap-3" style={{ marginBottom: '40px' }}>
          <img src={logo.src} alt="logo" className="w-full h-10 object-contain" />
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.Icon;
          const isActive = pathname === item.id;
          return (
            <div key={item.id}>
              <Link
                href={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sides transition-all ${
                  isActive
                    ? 'bg-color-purple text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
              {(index === 2 || index === 4) && (
                <div className="border-t border-gray-200 my-2"></div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Upgrade Plan Card */}
      <div className="mt-auto upgrade-card-gradient rounded-xl p-6 text-white" style={{ height: '220px'}}>
        <h3 className="font-bold text-lg mb-2">Upgrade Your Plan</h3>
        <p className="text-sm text-purple-100 mb-4">Boost your success rate now!</p>
        <Link href="/subscription" className="block w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-center">
          Subscription
        </Link>
      </div>
    </aside>
  );
}
