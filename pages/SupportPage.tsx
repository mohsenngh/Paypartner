
import React, { useState } from 'react';
import { CallIcon, ChevronLeftIcon } from '../components/icons';

type View = 'main' | 'ticketing';

const TicketingPage: React.FC<{onBack: () => void}> = ({ onBack }) => {
    return (
        <div className="p-4 animate-fade-in">
             <header className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">ثبت و پیگیری درخواست</h1>
            </header>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center">سوابق درخواست‌ها</h2>
                <div className="flex justify-center bg-slate-200 dark:bg-slate-700 p-1 rounded-xl">
                    <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg bg-white dark:bg-slate-800 shadow text-indigo-600 dark:text-indigo-400">در جریان</button>
                    <button className="w-full py-2 px-4 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-400">خاتمه یافته</button>
                </div>
                <div className="mt-4 text-center text-slate-500 dark:text-slate-400 py-8">
                    <p>درخواست در حال جریانی وجود ندارد.</p>
                </div>
            </div>

            <div className="mt-6">
                 <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                    ثبت درخواست جدید
                </button>
            </div>
        </div>
    );
};


const SupportPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<View>('main');

  const supportTiles = [
    { title: "سوالات متداول (FAQ)", action: () => {} },
    { title: "چت آنلاین با پشتیبانی", action: () => {} },
    { title: "ثبت درخواست پشتیبانی (تیکتینگ)", action: () => setView('ticketing') },
    { title: "تماس با پشتیبانی", action: () => setShowModal(true) },
  ];

  if (view === 'ticketing') {
      return <TicketingPage onBack={() => setView('main')} />;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-extrabold text-center mb-6 text-slate-800 dark:text-slate-200">پشتیبانی</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportTiles.map((tile, index) => (
          <div key={index} onClick={tile.action} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-lg font-semibold text-center text-indigo-600 dark:text-indigo-400">{tile.title}</h2>
          </div>
        ))}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100 text-center">توجه</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300 text-center">
              پذیرنده گرامی، جهت جلوگیری از اتلاف وقت، لطفاً از اینکه سؤال مورد نظر شما در قسمت سوالات پرتکرار نمی‌باشد اطمینان حاصل کنید.
            </p>
            <div className="space-y-3">
                <a href="tel:+982184080" className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 font-bold py-2 px-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors">
                    <CallIcon />
                    <span>+982184080</span>
                </a>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  متوجه شدم
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
