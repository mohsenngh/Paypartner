import React, { useState } from 'react';
import { PlusIcon, ChevronLeftIcon, UploadIcon } from '../components/icons';

type SalesTab = 'کسب و کار' | 'ارتقای فروش';
type SalesView = 'main' | 'sms_campaign' | 'new_sms_form' | 'business_form';

const PromotionTile: React.FC<{ title: string; subtitle: string; onClick?: () => void }> = ({ title, subtitle, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
    </div>
);

const NewSmsCampaignForm: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="p-4 space-y-6">
        <header className="flex items-center">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
            </button>
            <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">ایجاد کمپین پیامکی جدید</h1>
        </header>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">انتخاب محدوده</label>
                <input type="text" placeholder="مثال: منطقه ۲ تهران" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">تاریخ</label>
                    <input type="date" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">ساعت</label>
                    <input type="time" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
            <div className="relative flex items-start">
                <div className="flex items-center h-5">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300 rounded" />
                </div>
                <div className="ms-3 text-sm">
                    <label htmlFor="comments" className="font-medium text-slate-700 dark:text-slate-300">ارسال فقط به دارندگان 724</label>
                    <p id="comments-description" className="text-slate-500 dark:text-slate-400">قیمت 30% ارزان‌تر از پکیج پیامکی اصلی</p>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">تعداد پیامک: <span className="font-bold text-indigo-600">2500</span></label>
                <input type="range" min="500" max="10000" step="500" defaultValue="2500" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">متن پیام (150 کاراکتر)</label>
                <textarea rows={4} maxLength={150} className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                ارسال جهت بررسی
            </button>
        </div>
    </div>
);

const SmsCampaignPage: React.FC<{onBack: () => void, onNew: () => void}> = ({ onBack, onNew }) => {
    return (
        <div className="p-4 space-y-4">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">کمپین پیامکی</h1>
            </header>
            <div className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl relative h-64 flex flex-col justify-center items-center">
                <p className="text-slate-500">برای ایجاد کمپین جدید، دکمه + را بزنید.</p>
                <p className="text-center text-slate-500 mt-8">موردی در صف وجود ندارد.</p>
                <p className="text-center text-slate-500 mt-2">هنوز کمپینی ارسال نشده است.</p>
                <button onClick={onNew} className="absolute bottom-4 start-4 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition">
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
}

const BusinessRegistrationForm: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="p-4 space-y-6">
        <header className="flex items-center">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
            </button>
            <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">ثبت کسب و کار</h1>
        </header>
        <div className="space-y-4">
             <div className="flex flex-col items-center space-y-2">
                <label htmlFor="profile-pic" className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
                    <UploadIcon className="w-8 h-8"/>
                    <span className="text-xs mt-1">پروفایل</span>
                </label>
                <input id="profile-pic" type="file" className="hidden" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">نام کسب و کار</label>
                <input type="text" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">شماره ترمینال</label>
                <input type="text" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                     <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">دسته بندی اصلی</label>
                    <select className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option>محصول</option>
                        <option>خدمت</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">دسته بندی فرعی</label>
                    <input type="text" className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">معرفی فروشگاه (500 کاراکتر)</label>
                <textarea rows={5} maxLength={500} className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">تصاویر فروشگاه</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-slate-400"/>
                        <p className="text-xs text-slate-500 dark:text-slate-400">منو، تصویر برند و فضای فروشگاه، لیست خدمات و.. در این قسمت بارگزاری گردد.</p>
                    </div>
                </div>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                ثبت درخواست
            </button>
        </div>
    </div>
);


const SalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SalesTab>('کسب و کار');
  const [view, setView] = useState<SalesView>('main');

  if (view === 'sms_campaign') {
      return <SmsCampaignPage onBack={() => setView('main')} onNew={() => setView('new_sms_form')} />;
  }
  if (view === 'new_sms_form') {
      return <NewSmsCampaignForm onBack={() => setView('sms_campaign')} />;
  }
  if (view === 'business_form') {
      return <BusinessRegistrationForm onBack={() => setView('main')} />;
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
        <div className="space-y-4 text-center">
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
        </div>
      )}

      {activeTab === 'ارتقای فروش' && (
        <div className="space-y-4">
          <PromotionTile 
            title="تبلیغ روی نقشه" 
            subtitle="کسب‌وکار خود را در نقشه به مشتریان نزدیک نمایش دهید." 
          />
          <PromotionTile 
            title="کوپن‌ها" 
            subtitle="با ارائه تخفیف و کوپن، مشتریان وفادار جذب کنید." 
          />
          <PromotionTile 
            title="تبلیغ پیامکی" 
            subtitle="به مشتریان منطقه خود پیامک تبلیغاتی هدفمند ارسال کنید."
            onClick={() => setView('sms_campaign')}
          />
        </div>
      )}
    </div>
  );
};

export default SalesPage;