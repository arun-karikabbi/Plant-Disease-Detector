import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Camera,
  ClipboardCheck,
  History,
  Leaf,
  MessageSquareText,
  WifiOff,
} from 'lucide-react';
import { useLeafCare } from '../context/LeafCareContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: Camera, end: true },
  { to: '/results', label: 'Results', Icon: ClipboardCheck, end: false },
  { to: '/advisor', label: 'Advisor', Icon: MessageSquareText, end: false },
  { to: '/history', label: 'History', Icon: History, end: false },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isOnline } = useLeafCare();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7] text-[#142216]">
      {/* Compact Top App Bar (48px mobile, 56px desktop) */}
      <header className="sticky top-0 z-30 h-12 md:h-14 bg-white/95 backdrop-blur-md border-b border-[#E1EBE2]">
        <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between gap-6">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] rounded-lg"
          >
            <span className="w-8 h-8 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-[#142216]">
              LeafCare AI
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6"
          >
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `py-1.5 text-base font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
                    isActive
                      ? 'border-[#2E7D32] text-[#2E7D32] font-semibold'
                      : 'border-transparent text-[#4A614D] hover:text-[#142216]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Offline warning only appears when truly offline */}
          <div className="flex items-center shrink-0">
            {!isOnline && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B71C1C] bg-[#FFEBEE] px-2.5 py-1 rounded-lg">
                <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Offline</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-5 pb-24 md:py-8">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar (56px height + safe area) */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E1EBE2] pb-safe"
      >
        <div className="max-w-lg mx-auto grid grid-cols-4 h-14">
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2E7D32] ${
                  isActive
                    ? 'text-[#2E7D32] font-semibold'
                    : 'text-[#4A614D] hover:text-[#142216]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.9]'}`}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] leading-none tracking-tight whitespace-nowrap">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
