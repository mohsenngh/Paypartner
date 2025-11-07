
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon, WalletIcon, ShoppingBagIcon, BuildingStorefrontIcon, ChevronLeftIcon } from '../components/icons';

type View = 'main' | 'shopping';

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-indigo-600 dark:text-indigo-400">{title}</h2>
        <div className="space-y-2 text-slate-700 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const ShoppingPage: React.FC<{onBack: () => void}> = ({onBack}) => {
    const sampleStores = [
        "فروشگاه زنجیره‌ای کوروش", "دیجی‌کالا", "اسنپ فود", "فروشگاه رفاه", "کافه کتاب",
        "رستوران البرز", "سینما آزادی", "فروشگاه لباس ال سی وایکیکی", "شهر فرش", "لوازم خانگی اسنوا"
    ];

    return (
        <div className="p-4 space-y-6">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">خرید</h1>
            </header>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg text-center">
                <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">دریافت تسهیلات</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">با اعتبار خود از فروشگاه‌های معتبر خرید کنید.</p>
                <button className="w-full max-w-xs mx-auto bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">
                    مشاهده طرح‌ها
                </button>
            </div>
            <div className="space-y-4">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">فروشگاه‌های طرف قرارداد</h3>
                {sampleStores.map(store => (
                    <div key={store} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex items-center space-i-4">
                        <BuildingStorefrontIcon className="w-8 h-8 text-indigo-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{store}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ManagementPage: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [view, setView] = useState<View>('main');

    if (view === 'shopping') {
        return <ShoppingPage onBack={() => setView('main')} />;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">مدیریت</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center">
                    <WalletIcon className="w-8 h-8 text-indigo-500 mb-2"/>
                    <h2 className="font-bold text-slate-800 dark:text-slate-200">کیف پول</h2>
                    <p className="font-semibold text-lg text-green-500 mt-1">۵,۲۵۰,۰۰۰ ریال</p>
                </div>
                 <button onClick={() => setView('shopping')} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <ShoppingBagIcon className="w-8 h-8 text-indigo-500 mb-2"/>
                    <h2 className="font-bold text-slate-800 dark:text-slate-200">خرید</h2>
                    <p className="text-sm text-slate-500 mt-1">تسهیلات و فروشگاه</p>
                </button>
            </div>

            <InfoSection title="اطلاعات پروفایل">
                <p><strong>نام:</strong> علی رضایی</p>
                <p><strong>کد ملی:</strong> ۱۲۳۴۵۶۷۸۹۰</p>
            </InfoSection>

            <InfoSection title="اطلاعات حساب">
                <p><strong>شماره شبا:</strong> IR123456789012345678901234</p>
                <p><strong>بانک:</strong> ملت</p>
            </InfoSection>
            
            <InfoSection title="اطلاعات فروشگاه">
                <p><strong>نام فروشگاه:</strong> فروشگاه نمونه</p>
                <p><strong>آدرس:</strong> تهران، میدان آزادی، خیابان آزادی، پلاک ۱</p>
            </InfoSection>

            <div className="pt-6 text-center">
                <button className="w-full max-w-xs mx-auto bg-red-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-600 transition-colors duration-300">
                    خروج از حساب کاربری
                </button>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    نسخه اپلیکیشن: 1.1.0
                </p>
            </div>
        </div>
    );
};

export default ManagementPage;
