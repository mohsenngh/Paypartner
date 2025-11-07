import React, { useState } from 'react';
import {
    DocumentTextIcon,
    CreditCardIcon,
    BanknotesIcon,
    SignalIcon,
    EyeIcon,
    BuildingLibraryIcon,
    ClockIcon,
    KeyIcon,
    ArrowsRightLeftIcon,
    ReceiptPercentIcon,
    TruckIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    LightBulbIcon,
} from '../components/icons';

type ServiceTab = 'کارتخوان' | 'درگاه پرداخت';

const ServiceGridTile: React.FC<{ title: string; Icon: React.FC<{className?: string}>; bgClassName: string }> = ({ title, Icon, bgClassName }) => (
  <div className={`${bgClassName} p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-32`}>
    <div className="w-12 h-12 flex items-center justify-center mb-2">
      <Icon className="w-10 h-10 text-white" />
    </div>
    <h3 className="font-semibold text-white text-sm">{title}</h3>
  </div>
);

const allServices = [
    { title: "درخواست کاغذ", Icon: DocumentTextIcon, bgClassName: 'bg-teal-500' },
    { title: "چک", Icon: CreditCardIcon, bgClassName: 'bg-sky-500' },
    { title: "ودیعه کارتخوان", Icon: BanknotesIcon, bgClassName: 'bg-emerald-500' },
    { title: "آبونمان سیم کارت", Icon: SignalIcon, bgClassName: 'bg-rose-500' },
    { title: "مشاهده شماره کارت مشتری", Icon: EyeIcon, bgClassName: 'bg-violet-500' },
    { title: "مشاهده وضعیت بانک‌ها", Icon: BuildingLibraryIcon, bgClassName: 'bg-amber-500' },
    { title: "تاریخچه مراجعات پشتیبان", Icon: ClockIcon, bgClassName: 'bg-blue-500' },
    { title: "بازنشانی رمز", Icon: KeyIcon, bgClassName: 'bg-slate-600' },
    { title: "کارت به کارت", Icon: ArrowsRightLeftIcon, bgClassName: 'bg-cyan-500' },
    { title: "قبوض", Icon: ReceiptPercentIcon, bgClassName: 'bg-orange-500' },
    { title: "خودرو", Icon: TruckIcon, bgClassName: 'bg-lime-500' },
    { title: "آموزش", Icon: BookOpenIcon, bgClassName: 'bg-fuchsia-500' },
    { title: "راهنمای کارتخوان", Icon: QuestionMarkCircleIcon, bgClassName: 'bg-indigo-500' },
    { title: "ثبت پیشنهاد", Icon: LightBulbIcon, bgClassName: 'bg-yellow-500' },
];

const ServicesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ServiceTab>('کارتخوان');
    const hasPaymentGateway = false; // Mock data

    return (
        <div className="p-4 space-y-6">
             <h1 className="text-2xl font-extrabold text-center text-slate-800 dark:text-slate-200">سرویس‌ها</h1>
            <div className="flex justify-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                {(['کارتخوان', 'درگاه پرداخت'] as ServiceTab[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === tab ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'کارتخوان' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                   {allServices.map(service => (
                       <ServiceGridTile key={service.title} {...service} />
                   ))}
                </div>
            )}

            {activeTab === 'درگاه پرداخت' && (
                <div className="animate-fade-in">
                    {hasPaymentGateway ? (
                        <p className="text-center text-slate-500 dark:text-slate-400">اطلاعات درگاه پرداخت شما در اینجا نمایش داده می‌شود.</p>
                    ) : (
                        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">شما درگاه فعالی ندارید</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">برای فروش آنلاین و دریافت وجه از مشتریان، درگاه پرداخت خود را فعال کنید.</p>
                            <button className="bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                                ثبت درخواست درگاه پرداخت
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
