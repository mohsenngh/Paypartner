import React from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { EntityType } from '../types';
import { UserIcon, BuildingOfficeIcon } from '../components/icons';

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

const RegistrationStep3EntityType: React.FC = () => {
  const { nextStep, updateData } = useRegistration();

  const handleSelect = (entityType: EntityType) => {
    updateData({ entityType });
    nextStep();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">نوع شخصیت</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">نوع شخصیت خود را مشخص کنید.</p>
      </div>
      
      <div className="space-y-4">
        <SelectionCard 
          Icon={UserIcon}
          title="شخص حقیقی"
          description="ثبت‌نام با اطلاعات فردی (کد ملی)"
          onClick={() => handleSelect('individual')}
        />
        <SelectionCard 
          Icon={BuildingOfficeIcon}
          title="شخص حقوقی"
          description="ثبت‌نام با اطلاعات شرکت (شناسه ملی)"
          onClick={() => handleSelect('legal')}
        />
      </div>
    </div>
  );
};

export default RegistrationStep3EntityType;