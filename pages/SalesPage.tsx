import React, { useState } from 'react';
import { PlusIcon, ChevronLeftIcon, UploadIcon, ClockIcon, BuildingStorefrontIcon, MapPinIcon, TagIcon, PercentIcon, ChatBubbleLeftEllipsisIcon } from '../components/icons';
import { BusinessRegistrationStatus } from '../types';
import CampaignsPage from './CampaignsPage';

type SalesTab = 'کسب و کار' | 'ارتقای فروش';
type SalesView = 'main' | 'business_form' | 'campaigns';

const PromotionTile: React.FC<{ title: string; subtitle: string; Icon: React.FC<{ className?: string }>; onClick?: () => void }> = ({ title, subtitle, Icon, onClick }) => (
    <button onClick={onClick} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg w-full text-right hover:shadow-xl transition-shadow duration-300 flex items-center space-i-4">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-800">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
    </button>
);


const BusinessRegistrationForm: React.FC<{ onBack: () => void, onSubmit: () => void }> = ({ onBack, onSubmit }) => (
    <div className="p-4 space-y-6 animate-fade-in">
        <header className="flex items-center">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
            </button>
            <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">ثبت کسب و کار</h1>
        </header>
        <div className="space-y-4">
             <div className="flex flex-col items-center space-y-2">
                <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
                    <UploadIcon className="w-8 h-8"/>
                    <span className="text-xs mt-1">لوگو</span>
                </label>
                <input id="logo-upload" type="file" className="hidden" accept="image/*" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">نام فروشگاه</label>
                <input type="text" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">معرفی کوتاه (اختیاری)</label>
                <textarea rows={3} maxLength={200} className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">گالری تصاویر</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-slate-400"/>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">برای بارگذاری کلیک کنید</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">چند تصویر از فروشگاه یا محصولات خود انتخاب کنید</p>
                    </div>
                </div>
            </div>
            <button onClick={onSubmit} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                ثبت درخواست
            </button>
        </div>
    </div>
);


const SalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SalesTab>('کسب و کار');
  const [view, setView] = useState<SalesView>('main');
  const [businessStatus, setBusinessStatus] = useState<BusinessRegistrationStatus>('none');

  const handleBusinessSubmit = () => {
      setBusinessStatus('pending');
      setView('main');
  };

  if (view === 'business_form') {
      return <BusinessRegistrationForm onBack={() => setView('main')} onSubmit={handleBusinessSubmit} />;
  }

  if (view === 'campaigns') {
      return <CampaignsPage onBack={() => setView('main')} />;
  }


  return (
    <div className="p-4">
      <div className="flex justify-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-6">
        {(['کسب و کار', 'ارتقای فروش'] as SalesTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === tab ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'کسب و کار' && (
        <div className="space-y-4 text-center animate-fade-in">
            {businessStatus === 'none' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-center items-center space-i-4 mb-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                            <p className="text-sm mt-1">ثبت کسب و کار</p>
                        </div>
                         <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
                         <div className="flex flex-col items-center opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold">2</div>
                            <p className="text-sm mt-1">بررسی درخواست</p>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">با ثبت کسب و کار خود به مشتریان بالقوه بیشتری دسترسی خواهید داشت.</p>
                    <button 
                        onClick={() => setView('business_form')}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300"
                    >
                        فعال‌سازی کسب و کار
                    </button>
                </div>
            )}
             {businessStatus === 'pending' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                   <ClockIcon className="w-12 h-12 text-amber-500 mb-3" />
                   <h3 className="font-bold text-lg">درخواست شما در حال بررسی است</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">نتیجه از طریق پیامک به شما اطلاع داده خواهد شد.</p>
                </div>
            )}
             {businessStatus === 'active' && (
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                   <BuildingStorefrontIcon className="w-12 h-12 text-green-500 mb-3" />
                   <h3 className="font-bold text-lg">کسب و کار شما فعال است</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">برای مدیریت به بخش ارتقای فروش مراجعه کنید.</p>
                </div>
            )}
        </div>
      )}

      {activeTab === 'ارتقای فروش' && (
        <div className="space-y-4 animate-fade-in">
          <PromotionTile 
            title="تبلیغ روی نقشه" 
            subtitle="کسب‌وکار خود را در نقشه به مشتریان نزدیک نمایش دهید." 
            Icon={MapPinIcon}
          />
           <PromotionTile 
            title="تخفیف ها" 
            subtitle="ایجاد تخفیف برای محصولات یا دسته‌بندی‌ها."
            Icon={PercentIcon}
            onClick={() => setView('campaigns')}
          />
          <PromotionTile 
            title="کوپن‌ها" 
            subtitle="با ارائه تخفیف و کوپن، مشتریان وفادار جذب کنید."
            Icon={TagIcon}
            onClick={() => setView('campaigns')}
          />
          <PromotionTile 
            title="پیامک" 
            subtitle="به مشتریان منطقه خود پیامک هدفمند ارسال کنید."
            Icon={ChatBubbleLeftEllipsisIcon}
          />
        </div>
      )}
    </div>
  );
};

export default SalesPage;
