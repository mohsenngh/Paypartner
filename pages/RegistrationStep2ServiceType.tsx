import React from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { ServiceType } from '../types';
import { DevicePhoneMobileIcon, GlobeAltIcon } from '../components/icons';

const SelectionCard: React.FC<{ title: string, description: string, Icon: React.FC<{className?: string}>, onClick: () => void }> = 
({ title, description, Icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-right bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 flex items-center space-i-4"
  >
    <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-indigo-500" />
    </div>
    <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </button>
);

const RegistrationStep2ServiceType: React.FC = () => {
  const { nextStep, updateData } = useRegistration();

  const handleSelect = (serviceType: ServiceType) => {
    updateData({ serviceType });
    nextStep();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">انتخاب سرویس</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">چه سرویسی برای کسب و کار خود نیاز دارید؟</p>
      </div>
      
      <div className="space-y-4">
        <SelectionCard 
          Icon={DevicePhoneMobileIcon}
          title="دستگاه کارتخوان (POS)"
          description="مناسب برای فروشگاه‌ها و کسب و کارهای حضوری"
          onClick={() => handleSelect('pos')}
        />
        <SelectionCard 
          Icon={GlobeAltIcon}
          title="درگاه پرداخت اینترنتی (IPG)"
          description="مناسب برای فروشگاه‌های آنلاین و وبسایت‌ها"
          onClick={() => handleSelect('gateway')}
        />
      </div>
    </div>
  );
};

export default RegistrationStep2ServiceType;