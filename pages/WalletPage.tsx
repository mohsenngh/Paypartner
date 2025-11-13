import React, { useState } from 'react';
import { ChevronLeftIcon, WalletIcon } from '../components/icons';
import { WalletTransaction } from '../types';

interface WalletPageProps {
  onBack: () => void;
  currentBalance: number; // in Rials
  onCharge: (amount: number) => void; // amount in Toman
  transactions: WalletTransaction[];
}

const WalletPage: React.FC<WalletPageProps> = ({ onBack, currentBalance, onCharge, transactions }) => {
    const [amount, setAmount] = useState('');
    const quickAmounts = [50000, 100000, 200000]; // in Toman

    const handleCharge = () => {
        const numericAmount = parseInt(amount, 10);
        if (numericAmount > 0) {
            onCharge(numericAmount);
            setAmount('');
            alert('کیف پول با موفقیت شارژ شد!');
        }
    };

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">کیف پول</h1>
            </header>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                <WalletIcon className="w-12 h-12 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">موجودی فعلی</p>
                <p className="text-3xl font-extrabold text-green-500 mt-1">{currentBalance.toLocaleString('fa')} <span className="text-lg">ریال</span></p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-center">شارژ کیف پول</h2>
                <div className="space-y-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                            placeholder="مبلغ مورد نظر را وارد کنید" 
                            className="w-full p-3 text-center bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg"
                        />
                         <span className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400">تومان</span>
                    </div>
                    <div className="flex justify-center gap-2">
                        {quickAmounts.map(qAmount => (
                            <button key={qAmount} onClick={() => setAmount(qAmount.toString())} className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm">
                                {qAmount.toLocaleString('fa')}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleCharge} disabled={!amount || parseInt(amount, 10) <= 0} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400">
                        پرداخت
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4">تاریخچه تراکنش‌ها</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                    {transactions.length > 0 ? transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                            <div>
                                <p className="font-semibold">{tx.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date.toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`} dir="ltr">
                                {tx.type === 'deposit' ? '+' : ''} {tx.amount.toLocaleString('fa')}
                            </p>
                        </div>
                    )) : (
                        <p className="text-center text-slate-500 py-4">تراکنشی یافت نشد.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletPage;