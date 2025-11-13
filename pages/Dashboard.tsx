import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Page } from '../types';
import BottomNav from '../components/BottomNav';
import ReportsPage from './ReportsPage';
import SupportPage from './SupportPage';
import ServicesPage from './ServicesPage';
import SalesPage from './SalesPage';
import ManagementPage from './ManagementPage';

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Reports);
  const { theme } = useContext(ThemeContext);

  const renderPage = () => {
    switch (activePage) {
      case Page.Reports:
        return <ReportsPage />;
      case Page.Support:
        return <SupportPage />;
      case Page.Services:
        return <ServicesPage />;
      case Page.Sales:
        return <SalesPage />;
      case Page.Management:
        return <ManagementPage />;
      default:
        return <ReportsPage />;
    }
  };

  return (
    <div className={`${theme} font-sans`}>
      <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
        <main className="pb-24">
          {renderPage()}
        </main>
        <BottomNav activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default Dashboard;
