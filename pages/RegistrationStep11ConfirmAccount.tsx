import React from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { getBankNameFromIBAN } from '../utils/iban';
import { BanknotesIcon } from '../components/icons';

const RegistrationStep11ConfirmAccount: React.FC = () => {
    const { data, nextStep } = useRegistration();

    return (
        <div className="animate-fade-in space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">تایید حساب تسویه</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">اطلاعات زیر را بررسی و تایید کنید.</p>
            </div>

            <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">حساب‌های تعریف شده:</h2>
                {data.settlementAccounts?.map((account, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                        <div className="flex items-center space-i-3 mb-2">
                            <BanknotesIcon className="w-6 h-6 text-indigo-500" />
                            <p className="font-bold text-slate-800 dark:text-slate-200">{getBankNameFromIBAN(account.accountNumber)}</p>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400" dir="ltr">{account.accountNumber}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1"><strong>سهم تسویه:</strong> {account.sharePercentage}%</p>
                    </div>
                ))}
            </div>
            
            <div className="pt-2">
                <button
                    onClick={nextStep}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
                >
                    تایید و ادامه
                </button>
            </div>
        </div>
    );
};

export default RegistrationStep11ConfirmAccount;
