import React, { useState } from 'react';
import { ChevronLeftIcon, PlusIcon, ClockIcon } from '../components/icons';
import { Discount, DiscountStatus, DiscountScope } from '../types';
import WheelDateTimePicker from '../components/WheelPicker';

interface DiscountsScreenProps {
  onBack: () => void;
}

const sampleDiscounts: Discount[] = [
    { id: '1', percentage: 20, startDate: new Date(Date.now() - 86400000), endDate: new Date(Date.now() + 86400000 * 2), scope: 'all', status: 'active' },
    { id: '2', percentage: 15, startDate: new Date(Date.now() + 86400000 * 3), endDate: new Date(Date.now() + 86400000 * 5), scope: 'category', scopeDetail: 'پوشاک', status: 'scheduled' },
    { id: '3', percentage: 25, startDate: new Date(Date.now() - 86400000 * 7), endDate: new Date(Date.now() - 86400000 * 4), scope: 'product', scopeDetail: 'کفش مدل X', status: 'expired' },
];

const DiscountCard: React.FC<{ discount: Discount }> = ({ discount }) => {
    const statusMap = {
        active: { text: 'درحال اجرا', color: 'bg-green-500' },
        scheduled: { text: 'در صف اجرا', color: 'bg-amber-500' },
        expired: { text: 'خاتمه‌یافته', color: 'bg-slate-500' },
    };
    const scopeMap = {
        all: 'تمام محصولات',
        category: `دسته: ${discount.scopeDetail}`,
        product: `محصول: ${discount.scopeDetail}`,
    };
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-500">{discount.percentage}%</span>
                <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${statusMap[discount.status].color}`}>{statusMap[discount.status].text}</span>
            </div>
            <p className="text-sm font-semibold">{scopeMap[discount.scope]}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(discount.startDate).toLocaleDateString('fa-IR')} تا {new Date(discount.endDate).toLocaleDateString('fa-IR')}
            </p>
        </div>
    );
};

const NewDiscountModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [scope, setScope] = useState<DiscountScope>('all');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showPickerFor, setShowPickerFor] = useState<'start' | 'end' | null>(null);

    const handleDateConfirm = (date: Date) => {
        if (showPickerFor === 'start') setStartDate(date);
        if (showPickerFor === 'end') setEndDate(date);
        setShowPickerFor(null);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-6">ایجاد تخفیف جدید</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">درصد تخفیف</label>
                        <input type="number" placeholder="مثلاً: 20" className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                         <button onClick={() => setShowPickerFor('start')} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-between items-center">
                            <span className="text-sm">{startDate ? startDate.toLocaleString('fa-IR', { dateStyle: 'short', timeStyle: 'short'}) : 'تاریخ شروع'}</span>
                            <ClockIcon className="w-5 h-5 text-slate-500"/>
                        </button>
                        <button onClick={() => setShowPickerFor('end')} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-between items-center">
                           <span className="text-sm">{endDate ? endDate.toLocaleString('fa-IR', { dateStyle: 'short', timeStyle: 'short'}) : 'تاریخ پایان'}</span>
                            <ClockIcon className="w-5 h-5 text-slate-500"/>
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">محدوده اعمال</label>
                        <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-lg">
                            {(['all', 'category', 'product'] as DiscountScope[]).map(s => (
                                <button key={s} onClick={() => setScope(s)} className={`w-full py-1 text-sm rounded-md ${scope === s ? 'bg-white dark:bg-slate-700 shadow' : ''}`}>
                                    {s === 'all' ? 'همه' : s === 'category' ? 'دسته' : 'محصول'}
                                </button>
                            ))}
                        </div>
                    </div>
                     {scope !== 'all' && (
                        <input type="text" placeholder={scope === 'category' ? 'نام دسته بندی' : 'نام یا شناسه محصول'} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg animate-fade-in" />
                     )}
                </div>
                 <div className="flex gap-2 mt-6">
                    <button onClick={onClose} className="w-full py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-semibold">بستن</button>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold">ایجاد تخفیف</button>
                </div>
            </div>
            {showPickerFor && <WheelDateTimePicker onCancel={() => setShowPickerFor(null)} onConfirm={handleDateConfirm} />}
        </div>
    );
};

const DiscountsScreen: React.FC<DiscountsScreenProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<DiscountStatus>('active');
    const [showModal, setShowModal] = useState(false);

    const filteredDiscounts = sampleDiscounts.filter(d => d.status === activeTab);
    const tabLabels: { key: DiscountStatus, label: string }[] = [{ key: 'active', label: 'درحال اجرا' }, { key: 'scheduled', label: 'در صف' }, { key: 'expired', label: 'خاتمه‌یافته' }];

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow">مدیریت تخفیف‌ها</h1>
            </header>
            
            <div className="flex justify-center bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
                 {tabLabels.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === key ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredDiscounts.length > 0 ? (
                    filteredDiscounts.map(d => <DiscountCard key={d.id} discount={d} />)
                ) : (
                    <p className="text-center text-slate-500 py-8">تخفیفی در این دسته‌بندی وجود ندارد.</p>
                )}
            </div>
            
            <button onClick={() => setShowModal(true)} className="fixed bottom-20 start-4 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition z-30">
                <PlusIcon className="w-7 h-7" />
            </button>

            {showModal && <NewDiscountModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default DiscountsScreen;
