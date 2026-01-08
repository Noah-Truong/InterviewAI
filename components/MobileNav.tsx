'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseIcon, PlayIcon, DocumentIcon, UserIcon, SettingsIcon, StarIcon, CoinIcon, CloseIcon } from './Icons';
import logo from '../assets/logo.png';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { id: '/', Icon: BriefcaseIcon, label: 'Jobs' },
    { id: '/mock-interview', Icon: PlayIcon, label: 'AI Mock Interview' },
    { id: '/digital-human', Icon: PlayIcon, label: 'Digital Human' },
    { id: '/resume', Icon: DocumentIcon, label: 'Resume' },
    { id: '/profile', Icon: UserIcon, label: 'Profile' },
    { id: '/settings', Icon: SettingsIcon, label: 'Setting' },
    { id: '/subscription', Icon: StarIcon, label: 'Subscription' },
    { id: '/credits', Icon: CoinIcon, label: 'Extra Credits' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Mobile Navigation Drawer */}
      <aside className="fixed top-0 left-0 h-full bg-white z-50 w-72 shadow-xl lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src={logo.src} alt="logo" className="h-8 object-contain" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.Icon;
            const isActive = pathname === item.id;
            return (
              <div key={item.id}>
                <Link
                  href={item.id}
                  onClick={onClose}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-color-purple text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
                {(index === 3 || index === 5) && (
                  <div className="border-t border-gray-200 my-2"></div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Upgrade Plan Card */}
        <div className="p-4">
          <div className="upgrade-card-gradient rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Upgrade Your Plan</h3>
            <p className="text-sm text-purple-100 mb-4">Boost your success rate now!</p>
            <Link
              href="/subscription"
              onClick={onClose}
              className="block w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-center"
            >
              Subscription
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}