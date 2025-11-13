import React, { useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';

interface RegistrationStep16SuccessProps {
    onGoToLogin: () => void;
}

const RegistrationStep16Success: React.FC<RegistrationStep16SuccessProps> = ({ onGoToLogin }) => {
    const { reset } = useRegistration();

    // Reset registration state when this component unmounts
    useEffect(() => {
        return () => {
            reset();
        }
    }, [reset]);

    return (
        <div className="animate-fade-in text-center py-10">
            <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-4">ثبت‌نام شما با موفقیت انجام شد!</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">به خانواده بزرگ پی‌پارتنر خوش آمدید. برای شروع، به صفحه ورود مراجعه کنید.</p>
            
            <div className="mt-8">
                 <button
                    onClick={onGoToLogin}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
                 >
                    رفتن به صفحه ورود
                 </button>
            </div>
        </div>
    );
};

export default RegistrationStep16Success;