import React from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { ChevronLeftIcon } from '../components/icons';
import RegistrationStep1Intro from './RegistrationStep1Intro';
import RegistrationStep2ServiceType from './RegistrationStep2ServiceType';
import RegistrationStep3EntityType from './RegistrationStep3EntityType';
import RegistrationStep4Mobile from './RegistrationStep4Identity';
import RegistrationStep5Otp from './RegistrationStep5Otp';
import RegistrationStep6NationalId from './RegistrationStep6NationalId';
import RegistrationStep7BirthDate from './RegistrationStep7BirthDate';
import RegistrationStep8IdDocs from './RegistrationStep8IdDocs';
import RegistrationStep9BusinessLicense from './RegistrationStep9BusinessLicense';
import RegistrationStep10Settlement from './RegistrationStep10Settlement';
import RegistrationStep11ConfirmAccount from './RegistrationStep11ConfirmAccount';
import RegistrationStep12TaxCode from './RegistrationStep12TaxCode';
import RegistrationStep13Address from './RegistrationStep13Address';
import RegistrationStep14ConfirmAddress from './RegistrationStep14ConfirmAddress';
import RegistrationStep15Review from './RegistrationStep15Review';
import RegistrationStep16Success from './RegistrationStep16Success';


interface RegistrationFlowProps {
  onBackToLanding: () => void;
  onGoToLogin: () => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ onBackToLanding, onGoToLogin }) => {
  const { step, prevStep } = useRegistration();
  const totalSteps = 16; // A representative total number of steps in the flow

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegistrationStep1Intro />;
      case 2:
        return <RegistrationStep2ServiceType />;
      case 3:
        return <RegistrationStep3EntityType />;
      case 4:
        return <RegistrationStep4Mobile />;
      case 5:
        return <RegistrationStep5Otp />;
      case 6:
        return <RegistrationStep6NationalId />;
      case 7:
        return <RegistrationStep7BirthDate />;
      case 8:
        return <RegistrationStep8IdDocs />;
      case 9:
        return <RegistrationStep9BusinessLicense />;
      case 10:
        return <RegistrationStep10Settlement />;
      case 11:
        return <RegistrationStep11ConfirmAccount />;
      case 12:
        return <RegistrationStep12TaxCode />;
      case 13:
        return <RegistrationStep13Address />;
      case 14:
        return <RegistrationStep14ConfirmAddress />;
      case 15:
        return <RegistrationStep15Review />;
      case 16:
        return <RegistrationStep16Success onGoToLogin={onGoToLogin} />;
      default:
         return (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold">فرآیند تکمیل شد.</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">از شکیبایی شما سپاسگزاریم.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      <header className="flex items-center space-i-4 p-4 sticky top-0 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={step > 1 ? prevStep : onBackToLanding} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
          <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">ثبت‌نام فروشندگان</h1>
      </header>
      
      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <main className="flex-grow max-w-lg mx-auto w-full p-4">
        {renderStep()}
      </main>
    </div>
  );
};

export default RegistrationFlow;