
import React from 'react';
import { Page } from '../types';
import { ReportsIcon, SupportIcon, ServicesIcon, SalesIcon, ManagementIcon } from './icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { page: Page.Reports, Icon: ReportsIcon },
  { page: Page.Sales, Icon: SalesIcon },
  { page: Page.Services, Icon: ServicesIcon },
  { page: Page.Support, Icon: SupportIcon },
  { page: Page.Management, Icon: ManagementIcon },
];

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(({ page, Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
              activePage === page
                ? 'text-indigo-500 dark:text-indigo-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400'
            }`}
            aria-current={activePage === page ? 'page' : undefined}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{page}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
