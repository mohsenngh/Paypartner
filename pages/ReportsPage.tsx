
import React, { useState } from 'react';
import { DownloadIcon, FaqIcon, ChevronDownIcon } from '../components/icons';

type TimeFilter = 'روزانه' | 'هفتگی' | 'ماهانه' | 'دلخواه';

const TransactionSearchForm = () => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mt-4">
        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">بررسی تراکنش خاص</h3>
        <div className="space-y-4">
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400">شماره کارت</label>
                <input type="text" id="cardNumber" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label htmlFor="trackingNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400">شماره پیگیری</label>
                <input type="text" id="trackingNumber" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label htmlFor="referenceNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400">شماره مرجع</label>
                <input type="text" id="referenceNumber" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                جستجو
            </button>
        </div>
    </div>
);

const ReportsPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<TimeFilter>('روزانه');
    const [showSearch, setShowSearch] = useState(false);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);

    const timeFilters: TimeFilter[] = ['روزانه', 'هفتگی', 'ماهانه', 'دلخواه'];

    const getFilterData = () => {
        switch (activeFilter) {
            case 'هفتگی':
                return ['هفته اول اردیبهشت', 'هفته دوم اردیبهشت', 'هفته سوم اردیبهشت', 'هفته چهارم اردیبهشت'];
            case 'ماهانه':
                return ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'];
            case 'روزانه':
            default:
                return Array.from({ length: 30 }, (_, i) => `${30 - i} اردیبهشت`);
        }
    };

    const filterData = getFilterData();

    return (
        <div className="p-4 space-y-4">
            <header className="flex justify-between items-center p-2 relative">
                <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <FaqIcon />
                </button>
                <div className="relative">
                    <button className="flex items-center space-i-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow">
                        <span>همه ترمینال‌ها</span>
                        <ChevronDownIcon />
                    </button>
                </div>
                <div className="relative">
                     <button onClick={() => setShowDownloadOptions(!showDownloadOptions)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                        <DownloadIcon className="w-7 h-7" />
                    </button>
                    {showDownloadOptions && (
                        <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl z-10">
                            <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">خروجی PDF</a>
                            <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">خروجی Excel</a>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex justify-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                {timeFilters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeFilter === filter ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="flex overflow-x-auto space-i-2 pb-2 no-scrollbar">
                {filterData.map(item => (
                    <div key={item} className="flex-shrink-0 flex items-center justify-center p-4 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-md cursor-pointer hover:bg-indigo-50 dark:hover:bg-slate-700">
                        <span className="font-medium text-center">{item}</span>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => setShowSearch(!showSearch)}
                className="w-full text-center py-3 px-4 bg-white dark:bg-slate-800 rounded-xl shadow-md text-indigo-600 dark:text-indigo-400 font-bold"
            >
                بررسی تراکنش خاص
            </button>

            {showSearch && <TransactionSearchForm />}

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mt-4">
                <h2 className="text-xl font-bold mb-4">گزارش ۱۰ اردیبهشت</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">مجموع فروش</span>
                        <span className="font-bold text-lg text-green-500">۱۲,۴۵۰,۰۰۰ ریال</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">تعداد تراکنش‌ها</span>
                        <span className="font-bold text-lg">۸۷</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">میانگین خرید</span>
                        <span className="font-bold text-lg">۱۴۳,۱۰۰ ریال</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
