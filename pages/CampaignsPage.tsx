import React, { useState } from 'react';
import { ChevronLeftIcon, PercentIcon, TagIcon } from '../components/icons';
import DiscountsScreen from './DiscountsScreen';
import CouponsScreen from './CouponsScreen';

interface CampaignsPageProps {
  onBack: () => void;
}

type CampaignView = 'main' | 'discounts' | 'coupons';

const CampaignOption: React.FC<{ title: string, description: string, Icon: React.FC<{className?:string}>, onClick: () => void }> = ({ title, description, Icon, onClick }) => (
    <button onClick={onClick} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg w-full text-right hover:shadow-xl hover:border-indigo-500 border-2 border-transparent transition-all duration-300 flex items-center space-i-4">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-9 h-9 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
            <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200">{title}</h3>
            <p className="text-md text-slate-600 dark:text-slate-400 mt-1">{description}</p>
        </div>
    </button>
);


const CampaignsPage: React.FC<CampaignsPageProps> = ({ onBack }) => {
    const [view, setView] = useState<CampaignView>('main');

    if (view === 'discounts') {
        return <DiscountsScreen onBack={() => setView('main')} />;
    }
    if (view === 'coupons') {
        return <CouponsScreen onBack={() => setView('main')} />;
    }

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">مدیریت جشنواره‌ها</h1>
            </header>
            <div className="space-y-4">
                <CampaignOption 
                    title="تخفیف"
                    description="ایجاد تخفیف برای محصولات یا دسته‌بندی‌ها"
                    Icon={PercentIcon}
                    onClick={() => setView('discounts')}
                />
                <CampaignOption 
                    title="کوپن"
                    description="ایجاد کوپن‌های تخفیف شرطی برای مشتریان"
                    Icon={TagIcon}
                    onClick={() => setView('coupons')}
                />
            </div>
        </div>
    );
};

export default CampaignsPage;
