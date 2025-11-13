import React, { useState, useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { ClockIcon, DocumentTextIcon } from '../components/icons';

type ViewState = 'reviewing' | 'ready' | 'viewing_contract';

const RegistrationStep15Review: React.FC = () => {
  const { updateData, nextStep } = useRegistration();
  const [viewState, setViewState] = useState<ViewState>('reviewing');
  const [contractAccepted, setContractAccepted] = useState(false);

  useEffect(() => {
    if (viewState === 'reviewing') {
      const timer = setTimeout(() => {
        setViewState('ready');
      }, 3000); // Simulate a 3-second review process
      return () => clearTimeout(timer);
    }
  }, [viewState]);

  const handleFinalSubmit = () => {
    if (contractAccepted) {
        updateData({ contractAccepted: true });
        nextStep();
    }
  };
  
  const contractText = `این قرارداد بین شرکت پرداخت الکترونیک سامان (که از این پس "شرکت" نامیده می‌شود) و شما (که از این پس "پذیرنده" نامیده می‌شوید) منعقد می‌گردد. ... ماده ۱: تعاریف ... ماده ۲: موضوع قرارداد ... ماده ۳: مدت قرارداد ... ماده ۴: تعهدات شرکت ... ماده ۵: تعهدات پذیرنده ... ماده ۶: فسخ قرارداد ... این قرارداد در ۶ ماده و ۲ تبصره تنظیم گردیده و طرفین با امضای الکترونیکی آن، خود را ملزم به رعایت کلیه مفاد آن می‌دانند.`;

  const renderContent = () => {
    switch (viewState) {
      case 'reviewing':
        return (
          <div className="text-center py-10">
            <ClockIcon className="w-16 h-16 text-indigo-500 mx-auto animate-spin" />
            <h2 className="text-xl font-bold mt-4">اطلاعات شما دریافت شد</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">کارشناسان ما در حال بررسی اطلاعات ارسالی شما هستند. لطفا شکیبا باشید.</p>
          </div>
        );
      case 'ready':
        return (
          <div className="text-center py-10">
            <DocumentTextIcon className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-xl font-bold mt-4">قرارداد شما آماده است</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">برای تکمیل فرآیند ثبت‌نام، لطفا قرارداد الکترونیکی را مطالعه و تایید نمایید.</p>
            <button onClick={() => setViewState('viewing_contract')} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition">
                مشاهده و تایید قرارداد
            </button>
          </div>
        );
      case 'viewing_contract':
        return (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto border border-slate-300 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-bold mb-2">متن قرارداد</h3>
                <p className="text-sm leading-relaxed">{contractText.repeat(5)}</p>
            </div>
            <div className="flex items-center">
                <input id="accept-contract" type="checkbox" checked={contractAccepted} onChange={(e) => setContractAccepted(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"/>
                <label htmlFor="accept-contract" className="ms-2 block text-sm text-slate-900 dark:text-slate-300">مفاد قرارداد را مطالعه کرده و با آن موافقم.</label>
            </div>
            <button onClick={handleFinalSubmit} disabled={!contractAccepted} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed">
                تایید نهایی و تکمیل ثبت‌نام
            </button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">بررسی نهایی و قرارداد</h1>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            {renderContent()}
        </div>
    </div>
  );
};

export default RegistrationStep15Review;
