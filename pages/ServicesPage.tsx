
import React, { useState } from 'react';

type ServiceTab = 'کارتخوان' | 'درگاه پرداخت';

const ServiceTile: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex items-center justify-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-24">
    <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">{title}</h3>
  </div>
);

const ServiceSection: React.FC<{ title: string; services: string[] }> = ({ title, services }) => (
    <div>
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {services.map(service => <ServiceTile key={service} title={service} />)}
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ServiceTab>('کارتخوان');

    const posServices = {
        "کارتخوان": [
            "درخواست کاغذ",
            "چک (ثبت/تایید/یادآوری)",
            "ودیعه کارتخوان",
            "آبونمان سیم کارت",
            "مشاهده شماره کارت مشتری",
            "مشاهده وضعیت بانک‌ها",
            "تاریخچه مراجعات پشتیبان",
            "بازنشانی رمز"
        ],
        "کاربردی روزمره": [
            "کارت به کارت",
            "قبوض",
            "خودرو"
        ],
        "آموزش": [
            "آموزش",
            "راهنمای کارتخوان",
            "ثبت پیشنهاد"
        ]
    };

    const hasPaymentGateway = false; // Mock data

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-6">
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
                <div className="space-y-8">
                    {Object.entries(posServices).map(([title, services]) => (
                        <ServiceSection key={title} title={title} services={services} />
                    ))}
                </div>
            )}

            {activeTab === 'درگاه پرداخت' && (
                <div>
                    {hasPaymentGateway ? (
                        <p>اطلاعات درگاه پرداخت شما در اینجا نمایش داده می‌شود.</p>
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
