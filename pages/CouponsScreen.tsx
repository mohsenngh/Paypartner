import React, { useState } from 'react';
import { ChevronLeftIcon, PlusIcon, ClockIcon } from '../components/icons';
import { Coupon, CouponCondition, CouponType } from '../types';
import WheelDateTimePicker from '../components/WheelPicker';

interface CouponsScreenProps {
  onBack: () => void;
}

const CouponWizardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [condition, setCondition] = useState<CouponCondition | null>(null);
    const [type, setType] = useState<CouponType | null>(null);
    const [expiry, setExpiry] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const conditionOptions: { key: CouponCondition, label: string }[] = [
        { key: 'first_order', label: 'سفارش اول مشتری' },
        { key: 'min_purchase', label: 'حداقل مبلغ خرید' },
        { key: 'specific_product', label: 'خرید محصول خاص' },
    ];
    const typeOptions: { key: CouponType, label: string }[] = [
        { key: 'free_shipping', label: 'ارسال رایگان' },
        { key: 'discount', label: 'تخفیف' },
        { key: 'gift', label: 'هدیه' },
    ];

    const renderStepContent = () => {
        switch (step) {
            case 1: return (
                <div>
                    <h3 className="font-bold mb-4">مرحله ۱: شرط کوپن را انتخاب کنید</h3>
                    <div className="space-y-2">
                        {conditionOptions.map(opt => (
                            <button key={opt.key} onClick={() => { setCondition(opt.key); setTimeout(() => setStep(2), 200); }} 
                                className={`w-full p-3 rounded-lg text-right ${condition === opt.key ? 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 2: return (
                 <div>
                    <h3 className="font-bold mb-4">مرحله ۲: نوع کوپن را انتخاب کنید</h3>
                    <div className="space-y-2">
                         {typeOptions.map(opt => (
                            <button key={opt.key} onClick={() => { setType(opt.key); setTimeout(() => setStep(3), 200);}} 
                                className={`w-full p-3 rounded-lg text-right ${type === opt.key ? 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 3: return (
                <div>
                    <h3 className="font-bold mb-4">مرحله ۳: جزئیات نهایی</h3>
                    <div className="space-y-3">
                        {type === 'discount' && (
                             <div className="grid grid-cols-2 gap-2">
                                <input type="number" placeholder="درصد تخفیف" className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg" />
                                <input type="number" placeholder="سقف تخفیف (تومان)" className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg" />
                            </div>
                        )}
                         <button onClick={() => setShowPicker(true)} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-between items-center">
                            <span className="text-sm">{expiry ? expiry.toLocaleDateString('fa-IR') : 'تاریخ انقضا'}</span>
                            <ClockIcon className="w-5 h-5 text-slate-500"/>
                        </button>
                    </div>
                </div>
            );
            default: return null;
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4 animate-fade-in">
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-4">ایجاد کوپن جدید</h2>
                <div className="h-48">
                   {renderStepContent()}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div>
                        {step > 1 && <button onClick={() => setStep(step-1)} className="py-2 px-4 bg-slate-200 dark:bg-slate-700 rounded-lg font-semibold">قبلی</button>}
                    </div>
                    <div>
                        {step === 3 ?
                            <button className="py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold">ایجاد کوپن</button>
                            : <button onClick={onClose} className="py-2 px-4">انصراف</button>
                        }
                    </div>
                </div>
             </div>
             {showPicker && <WheelDateTimePicker onCancel={() => setShowPicker(false)} onConfirm={(d) => { setExpiry(d); setShowPicker(false);}} />}
        </div>
    );
};


const CouponsScreen: React.FC<CouponsScreenProps> = ({ onBack }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow">مدیریت کوپن‌ها</h1>
            </header>
            
            <div className="text-center text-slate-500 py-20">
                <p>کوپن فعالی وجود ندارد.</p>
                <p className="text-sm">برای ایجاد کوپن جدید، دکمه + را بزنید.</p>
            </div>
            
             <button onClick={() => setShowModal(true)} className="fixed bottom-20 start-4 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition z-30">
                <PlusIcon className="w-7 h-7" />
            </button>
            {showModal && <CouponWizardModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default CouponsScreen;
