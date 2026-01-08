'use client';
import { useState } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { MenuIcon } from './Icons';

interface HeaderProps {
  activeFilter: 'Matched' | 'Liked' | 'Applied';
  onFilterChange: (filter: 'Matched' | 'Liked' | 'Applied') => void;
  likedCount: number;
  appliedCount: number;
  onNavigateHome?: () => void;
}

export default function Header({ activeFilter, onFilterChange, likedCount, appliedCount, onNavigateHome }: HeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-5 h-5 text-gray-700" />
          </button>

          {/* Global Filters */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            onClick={() => {
              onFilterChange('Matched');
              onNavigateHome?.();
            }}
            className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm ${
              activeFilter === 'Matched'
                ? 'bg-white selected-header-button text-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Matched
          </Link>
          
          <Link
            href="/"
            onClick={() => {
              onFilterChange('Liked');
              onNavigateHome?.();
            }}
            className={`relative px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm ${
              activeFilter === 'Liked'
                ? 'bg-white selected-header-button text-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Liked
            {likedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-color-green text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likedCount}
              </span>
            )}
          </Link>
          
          <Link
            href="/"
            onClick={() => {
              onFilterChange('Applied');
              onNavigateHome?.();
            }}
            className={`relative px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm ${
              activeFilter === 'Applied'
                ? 'bg-white selected-header-button text-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Applied
            {appliedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-color-green text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {appliedCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
