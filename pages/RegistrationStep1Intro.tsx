import React from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { DocumentTextIcon, CreditCardIcon, BuildingStorefrontIcon } from '../components/icons';

const StepItem: React.FC<{ Icon: React.FC<{className?: string}>, title: string, description: string }> = ({Icon, title, description}) => (
  <div className="flex items-start space-i-4">
    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-indigo-500" />
    </div>
    <div>
      <h3 className="font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </div>
);

const RegistrationStep1Intro: React.FC = () => {
  const { nextStep } = useRegistration();

  return (
    <div className="animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">به خانواده بزرگ پی‌پارتنر بپیوندید</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">برای شروع، مراحل زیر را دنبال کنید.</p>
      </div>
      
      <div className="my-8 space-y-6">
          <StepItem 
            Icon={DocumentTextIcon}
            title="تکمیل اطلاعات"
            description="اطلاعات هویتی، کسب و کار و حساب بانکی خود را وارد کنید."
          />
           <StepItem 
            Icon={CreditCardIcon}
            title="بررسی و قرارداد"
            description="کارشناسان ما اطلاعات شما را بررسی کرده و قرارداد الکترونیکی برایتان ارسال می‌شود."
          />
           <StepItem 
            Icon={BuildingStorefrontIcon}
            title="فعال‌سازی سرویس"
            description="پس از تایید قرارداد، سرویس درخواستی شما فعال خواهد شد."
          />
      </div>

      <div className="mt-8">
         <button
            onClick={nextStep}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
          >
            شروع ثبت‌نام
          </button>
      </div>
    </div>
  );
};

export default RegistrationStep1Intro;