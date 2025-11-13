import React, { useState, useMemo } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { SettlementAccount } from '../types';
import { PlusIcon } from '../components/icons';

const RegistrationStep10Settlement: React.FC = () => {
    const { data, updateData, nextStep } = useRegistration();
    const [accounts, setAccounts] = useState<SettlementAccount[]>(
        data.settlementAccounts || [{ accountNumber: '', sharePercentage: 100 }]
    );
    const [error, setError] = useState('');

    const totalPercentage = useMemo(() => {
        return accounts.reduce((sum, acc) => sum + (Number(acc.sharePercentage) || 0), 0);
    }, [accounts]);

    const handleAccountChange = (index: number, field: keyof SettlementAccount, value: string) => {
        const newAccounts = [...accounts];
        if (field === 'sharePercentage') {
             newAccounts[index][field] = Number(value.replace(/\D/g, ''));
        } else {
             newAccounts[index][field] = value;
        }
        setAccounts(newAccounts);
    };

    const addAccount = () => {
        setAccounts([...accounts, { accountNumber: '', sharePercentage: 0 }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (accounts.some(acc => !acc.accountNumber.trim())) {
            setError('لطفا شماره حساب/شبا را برای همه موارد وارد کنید.');
            return;
        }

        if (totalPercentage !== 100) {
            setError('مجموع سهم‌ها باید دقیقا ۱۰۰٪ باشد.');
            return;
        }
        
        updateData({ settlementAccounts: accounts });
        nextStep();
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">حساب تسویه</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">یک یا چند شماره شبا برای واریز وجه وارد کنید.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                {accounts.map((account, index) => (
                    <div key={index} className="space-y-2 border-b border-slate-200 dark:border-slate-700 pb-4">
                        <label htmlFor={`iban-${index}`} className="block text-sm font-medium text-slate-600 dark:text-slate-400">
                           شماره شبا حساب {index + 1}
                        </label>
                        <input
                            id={`iban-${index}`}
                            type="text"
                            placeholder="IR123456789012345678901234"
                            value={account.accountNumber}
                            onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
                            className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <label htmlFor={`share-${index}`} className="block text-sm font-medium text-slate-600 dark:text-slate-400">
                           سهم تسویه (٪)
                        </label>
                        <input
                            id={`share-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="100"
                            value={account.sharePercentage}
                            onChange={(e) => handleAccountChange(index, 'sharePercentage', e.target.value)}
                            className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addAccount}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-indigo-500 text-indigo-500 font-bold py-2 px-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>افزودن حساب جدید</span>
                </button>

                <div className={`p-3 rounded-lg text-center font-bold ${totalPercentage === 100 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'}`}>
                    مجموع سهم: {totalPercentage}%
                </div>
                
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg disabled:opacity-50"
                        disabled={totalPercentage !== 100}
                    >
                        مرحله بعد
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationStep10Settlement;