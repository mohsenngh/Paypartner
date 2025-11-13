import React from 'react';
import { BuildingStorefrontIcon } from '../components/icons';

interface LandingPageProps {
  onNavigate: (target: 'login' | 'register') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-indigo-600 rounded-full mb-6">
          <BuildingStorefrontIcon className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">
          به <span className="text-indigo-500">پی‌پارتنر</span> خوش آمدید
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          پلتفرم جامع مدیریت فروشندگان پرداخت الکترونیک سامان
        </p>
      </div>
      <div className="mt-12 w-full max-w-xs space-y-4">
        <button
          onClick={() => onNavigate('login')}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
        >
          ورود به پی‌پارتنر
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="w-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold py-3 px-4 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition duration-300 text-lg"
        >
          ثبت نام فروشندگان
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
