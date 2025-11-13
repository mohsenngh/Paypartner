import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon, WalletIcon, CreditCardIcon, ChevronLeftIcon, XCircleIcon, CheckCircleIcon, FingerPrintIcon, CalendarDaysIcon, PlusIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { CreditRequest, WalletTransaction, Loan, Installment, InstallmentStatus } from '../types';
import WalletPage from './WalletPage';


const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-indigo-600 dark:text-indigo-400">{title}</h2>
        <div className="space-y-2 text-slate-700 dark:text-slate-300">
            {children}
        </div>
    </div>
);

type CreditFlowStep = 'intro' | 'payment' | 'verifying' | 'result' | 'amount_selection' | 'contract' | 'success';

const CreditFlowPage: React.FC<{
    onBack: () => void;
    walletBalance: number; // in Toman
    setWalletBalance: (b: number) => void; // in Toman
    addTransaction: (t: Omit<WalletTransaction, 'id'|'date'>) => void;
    onGoToWallet: () => void;
    onSuccess: (fundedAmount: number) => void;
}> = ({onBack, walletBalance, setWalletBalance, addTransaction, onGoToWallet, onSuccess}) => {
    const [step, setStep] = useState<CreditFlowStep>('intro');
    const [flowError, setFlowError] = useState('');
    const [request, setRequest] = useState<CreditRequest>({
        status: 'idle',
        verificationFeePaid: false,
        creditScoreOk: false,
        membershipDurationOk: false,
        creditLimit: 0,
        requestedAmount: 0,
        serviceFee: 80000, // 80k Toman
    });
    
    const VERIFICATION_FEE = 29000;

    const handleStartVerification = () => {
        setFlowError('');
        setStep('payment');
    };

    const handlePayVerificationFee = () => {
        setFlowError('');
        if (walletBalance >= VERIFICATION_FEE) {
            setWalletBalance(walletBalance - VERIFICATION_FEE);
            addTransaction({ type: 'withdrawal', title: 'پرداخت هزینه اعتبارسنجی', amount: -VERIFICATION_FEE * 10 });
            setRequest(prev => ({ ...prev, verificationFeePaid: true, status: 'verifying' }));
            setStep('verifying');

            setTimeout(() => {
                const isApproved = Math.random() > 0.2;
                setRequest(prev => ({
                    ...prev,
                    status: isApproved ? 'approved' : 'denied',
                    creditScoreOk: isApproved || Math.random() > 0.3,
                    membershipDurationOk: isApproved || Math.random() > 0.1,
                    creditLimit: isApproved ? Math.floor(Math.random() * (3000 - 200 + 1) + 200) * 100000 : 0, // 20M to 300M Toman
                }));
                setStep('result');
            }, 3000);
        } else {
            setFlowError("موجودی کیف پول کافی نیست! لطفا ابتدا کیف پول خود را شارژ کنید.");
        }
    };

    const handleAmountSelection = (amount: number) => {
        setFlowError('');
        setRequest(prev => ({ ...prev, requestedAmount: amount }));
    };

    const handleConfirmAmount = () => {
         setFlowError('');
         if (walletBalance >= request.serviceFee) {
             setStep('contract');
         } else {
             setFlowError("موجودی کیف پول برای پرداخت کارمزد خدمات کافی نیست. لطفا ابتدا کیف پول خود را شارژ کنید.");
         }
    };

    const handleSignContract = () => {
         const newBalance = walletBalance - request.serviceFee + request.requestedAmount;
         setWalletBalance(newBalance);
         addTransaction({ type: 'withdrawal', title: 'کسر کارمزد خدمات', amount: -request.serviceFee * 10 });
         addTransaction({ type: 'deposit', title: 'واریز مبلغ تسهیلات', amount: request.requestedAmount * 10 });
         setRequest(prev => ({ ...prev, status: 'funded' }));
         setStep('success');
    }

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">درخواست اعتبار</h1>
            </header>

            {step === 'intro' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">شرایط اعتبارسنجی</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-justify leading-relaxed">
                        برای شروع فرآیند اعتبارسنجی و بهره‌مندی از تسهیلات، می‌بایست حداقل ۹ ماه از پذیرندگی شما در شبکه سپ گذشته و نمره اعتباری شما B3 (معادل ۵۸۰) یا بالاتر باشد.
                    </p>
                    <button onClick={handleStartVerification} className="w-full max-w-xs mx-auto bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">
                        شروع اعتبارسنجی
                    </button>
                </div>
            )}
            
            {step === 'payment' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <h2 className="text-lg font-bold mb-2">پرداخت هزینه اعتبارسنجی</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">هزینه استعلام و اعتبارسنجی مبلغ <span className="font-bold">{VERIFICATION_FEE.toLocaleString('fa')}</span> تومان می‌باشد که از کیف پول شما کسر خواهد شد.</p>
                    <p className="mb-6">موجودی کیف پول: <span className="font-bold">{walletBalance.toLocaleString('fa')}</span> تومان</p>
                    {flowError ? (
                        <div className="text-center mb-4">
                            <p className="text-red-500 text-sm mb-2">{flowError}</p>
                            <button onClick={onGoToWallet} className="w-full max-w-xs mx-auto bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors duration-300">
                                شارژ کیف پول
                            </button>
                        </div>
                    ) : (
                        <button onClick={handlePayVerificationFee} className="w-full max-w-xs mx-auto bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-300">
                            پرداخت و ثبت درخواست
                        </button>
                    )}
                </div>
            )}

            {step === 'verifying' && (
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto"></div>
                    <h2 className="text-lg font-bold mt-4">در حال اعتبارسنجی...</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">لطفاً شکیبا باشید، این فرآیند ممکن است چند لحظه طول بکشد.</p>
                </div>
            )}
            
             {step === 'result' && (
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-bold text-center mb-4">نتیجه اعتبارسنجی</h2>
                    <div className="space-y-3">
                        <div className={`flex items-center p-3 rounded-lg ${request.membershipDurationOk ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                           {request.membershipDurationOk ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <XCircleIcon className="w-6 h-6 text-red-500" />}
                           <span className="ms-3 font-semibold">حداقل ۹ ماه پذیرندگی فعال</span>
                        </div>
                        <div className={`flex items-center p-3 rounded-lg ${request.creditScoreOk ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                            {request.creditScoreOk ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <XCircleIcon className="w-6 h-6 text-red-500" />}
                           <span className="ms-3 font-semibold">نمره اعتباری بالاتر از B3 (580)</span>
                        </div>
                    </div>
                     {request.status === 'approved' ? (
                         <div className="text-center mt-6">
                            <p className="text-green-600 dark:text-green-400 font-bold">اعتبارسنجی با موفقیت انجام شد!</p>
                            <p className="mt-2">سقف اعتبار تخصیص یافته به شما:</p>
                            <p className="text-2xl font-extrabold text-indigo-500 my-2">{request.creditLimit.toLocaleString('fa')} تومان</p>
                            <button onClick={() => setStep('amount_selection')} className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700">انتخاب مبلغ وام</button>
                         </div>
                     ) : (
                         <div className="text-center mt-6">
                            <p className="text-red-500 font-bold">متاسفانه شرایط لازم برای دریافت تسهیلات را ندارید.</p>
                            <button onClick={onBack} className="w-full mt-4 bg-slate-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-600">بازگشت</button>
                         </div>
                     )}
                 </div>
            )}
            
             {step === 'amount_selection' && (
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-bold text-center mb-2">تعیین مبلغ وام</h2>
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">مبلغ مورد نظر خود را تا سقف {request.creditLimit.toLocaleString('fa')} تومان انتخاب کنید.</p>
                    <div className="text-center my-4">
                        <span className="text-3xl font-extrabold text-indigo-500">{request.requestedAmount.toLocaleString('fa')}</span>
                        <span className="text-lg ms-1">تومان</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={request.creditLimit}
                        step={100000}
                        value={request.requestedAmount}
                        onChange={(e) => handleAmountSelection(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                     <div className="flex justify-between text-xs font-semibold text-slate-500 px-1 mt-1">
                        <span>۰</span>
                        <span>{request.creditLimit.toLocaleString('fa')}</span>
                    </div>
                     <div className="mt-6 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-between items-center">
                        <span className="font-semibold">کارمزد خدمات (غیرقابل استرداد)</span>
                        <span className="font-bold">{request.serviceFee.toLocaleString('fa')} تومان</span>
                    </div>
                    {flowError ? (
                        <div className="text-center mt-4">
                            <p className="text-red-500 text-sm mb-2">{flowError}</p>
                            <button onClick={onGoToWallet} className="w-full max-w-xs mx-auto bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors duration-300">
                                شارژ کیف پول
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleConfirmAmount} className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400" disabled={request.requestedAmount === 0}>
                            مشاهده و تایید قرارداد
                        </button>
                    )}
                 </div>
            )}

            {step === 'contract' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-bold text-center mb-4">قرارداد تسهیلات</h2>
                    <div className="h-48 overflow-y-auto border border-slate-300 dark:border-slate-600 rounded-lg p-3 bg-slate-50 dark:bg-slate-900 text-sm leading-relaxed">
                        <p className="font-bold">مفاد مهم قرارداد:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>مبلغ تسهیلات: {request.requestedAmount.toLocaleString('fa')} تومان.</li>
                            <li> بازپرداخت در <span className="font-bold">۳ قسط</span> مساوی انجام خواهد شد.</li>
                            <li>شرکت پرداخت الکترونیک سامان به عنوان ضامن این قرارداد می‌باشد.</li>
                            <li>جهت جلوگیری از عدم بازپرداخت به موقع، <span className="font-bold">۱۰٪ از مبلغ تراکنش‌های روزانه</span> شما به صورت خودکار به کیف پول پی‌پارتنر واریز و تا زمان تسویه کامل نزد شرکت باقی می‌ماند.</li>
                             <li>در صورت عدم پرداخت بدهی در موعد مقرر، شرکت حق برداشت از موجودی کیف پول شما جهت تسویه بدهی را خواهد داشت.</li>
                            <li>پس از پایان موفقیت‌آمیز بازپرداخت، مبالغ کسر شده از تراکنش‌ها به طور کامل به حساب شما بازگردانده خواهد شد.</li>
                        </ul>
                    </div>
                     <button onClick={handleSignContract} className="w-full mt-6 bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2">
                        <FingerPrintIcon className="w-6 h-6"/>
                        <span>تایید قرارداد با اثر انگشت</span>
                    </button>
                </div>
            )}
            
            {step === 'success' && (
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">تسهیلات با موفقیت فعال شد!</h2>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">مبلغ <span className="font-bold">{request.requestedAmount.toLocaleString('fa')} تومان</span> به کیف پول شما واریز گردید.</p>
                    <button onClick={() => onSuccess(request.requestedAmount)} className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700">بازگشت به صفحه تسهیلات</button>
                 </div>
            )}

        </div>
    );
};

const FacilitiesPage: React.FC<{
    loans: Loan[];
    onGoToRequest: () => void;
    onViewDetails: (loanId: string) => void;
    onBack: () => void;
}> = ({ loans, onGoToRequest, onViewDetails, onBack }) => {
    
    const getNextDueDate = (loan: Loan) => {
        const nextDueInstallment = loan.installments.find(i => i.status === 'due');
        return nextDueInstallment ? nextDueInstallment.dueDate : null;
    }

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header className="flex items-center">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">مدیریت تسهیلات</h1>
            </header>

            {loans.length > 0 ? (
                <div className="space-y-4">
                    {loans.map(loan => (
                        <div key={loan.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">مبلغ کل وام</p>
                                    <p className="font-bold text-lg">{loan.totalAmount.toLocaleString('fa')} <span className="text-sm">تومان</span></p>
                                </div>
                                <button onClick={() => onViewDetails(loan.id)} className="text-sm bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold py-2 px-3 rounded-lg">
                                    مشاهده جزئیات
                                </button>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                 <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">مبلغ باقیمانده:</span>
                                    <span className="font-semibold">{loan.remainingAmount.toLocaleString('fa')} تومان</span>
                                </div>
                                {getNextDueDate(loan) && (
                                     <div className="flex justify-between text-sm mt-1">
                                        <span className="text-slate-600 dark:text-slate-400">سررسید بعدی:</span>
                                        <span className="font-semibold">{getNextDueDate(loan)?.toLocaleDateString('fa-IR')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">شما وام فعالی ندارید</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">برای بهره‌مندی از تسهیلات ویژه، درخواست خود را ثبت کنید.</p>
                </div>
            )}

            <button onClick={onGoToRequest} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700">
                <PlusIcon className="w-5 h-5" />
                <span>درخواست اعتبار جدید</span>
            </button>
        </div>
    );
};


const LoanDetailsPage: React.FC<{
    loan: Loan;
    onBack: () => void;
    onPayInstallment: (loanId: string, installmentId: string) => boolean;
    walletBalance: number; // in Rials
}> = ({ loan, onBack, onPayInstallment, walletBalance }) => {
    const [error, setError] = useState('');
    
    const handlePayment = (installment: Installment) => {
        setError('');
        const success = onPayInstallment(loan.id, installment.id);
        if (!success) {
            setError('موجودی کیف پول برای پرداخت این قسط کافی نیست.');
        }
    }
    
    return (
        <div className="p-4 space-y-6 animate-fade-in">
             <header className="flex items-center">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
                </button>
                <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-slate-200">جزئیات وام</h1>
            </header>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg space-y-3">
                <div className="flex justify-between"><span className="text-slate-500">مبلغ کل:</span> <span className="font-bold">{loan.totalAmount.toLocaleString('fa')} تومان</span></div>
                <div className="flex justify-between"><span className="text-slate-500">باقیمانده:</span> <span className="font-bold text-red-500">{loan.remainingAmount.toLocaleString('fa')} تومان</span></div>
                 <div className="flex justify-between"><span className="text-slate-500">تعداد اقساط:</span> <span className="font-bold">{loan.installments.length} قسط</span></div>
            </div>
            
            {error && <p className="text-center text-red-500 text-sm bg-red-100 dark:bg-red-900 p-2 rounded-lg">{error}</p>}

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
                <h2 className="font-bold mb-3">لیست اقساط</h2>
                <div className="space-y-3">
                    {loan.installments.map((inst, index) => (
                        <div key={inst.id} className="border-t border-slate-200 dark:border-slate-700 pt-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold">قسط {index + 1}</p>
                                    <div className="flex items-center text-xs text-slate-500 mt-1">
                                        <CalendarDaysIcon className="w-4 h-4 ms-1"/>
                                        <span className="me-1">سررسید:</span>
                                        <span>{inst.dueDate.toLocaleDateString('fa-IR')}</span>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold">{inst.amount.toLocaleString('fa')} تومان</p>
                                    {inst.status === 'paid' ? (
                                        <span className="text-xs font-semibold text-green-500 flex items-center gap-1 justify-end"><CheckCircleIcon className="w-4 h-4"/> پرداخت شده</span>
                                    ) : (
                                        <span className="text-xs font-semibold text-amber-500">سررسید</span>
                                    )}
                                </div>
                            </div>
                            {inst.status === 'due' && (
                                <button 
                                    onClick={() => handlePayment(inst)}
                                    className="w-full mt-3 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    پرداخت قسط
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


type View = 'main' | 'facilities' | 'credit_flow' | 'loan_details' | 'wallet';

const initialLoans: Loan[] = [
    {
        id: 'loan1',
        totalAmount: 3000000,
        remainingAmount: 2000000,
        installments: [
            { id: 'l1i1', amount: 1000000, dueDate: new Date(Date.now() - 30 * 86400000), status: 'paid' },
            { id: 'l1i2', amount: 1000000, dueDate: new Date(), status: 'due' },
            { id: 'l1i3', amount: 1000000, dueDate: new Date(Date.now() + 30 * 86400000), status: 'due' },
        ]
    }
];

const ManagementPage: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { logout } = useAuth();
    const [view, setView] = useState<View>('main');
    const [walletBalance, setWalletBalance] = useState(10000000); // 1M Toman in Rials
    const [transactions, setTransactions] = useState<WalletTransaction[]>([
         { id: '1', type: 'deposit', title: 'واریز اولیه', amount: 10000000, date: new Date(Date.now() - 86400000 * 2) },
    ]);
    const [loans, setLoans] = useState<Loan[]>(initialLoans);
    const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);


    const addTransaction = (t: Omit<WalletTransaction, 'id'|'date'>) => {
        setTransactions(prev => [{ id: Date.now().toString(), date: new Date(), ...t }, ...prev]);
    };
    
    const handleCharge = (amount: number) => { // amount in Toman
        const amountInRials = amount * 10;
        setWalletBalance(prev => prev + amountInRials);
        addTransaction({ type: 'deposit', title: 'شارژ کیف پول', amount: amountInRials });
    };

    const handleLoanSuccess = (fundedAmount: number) => { // amount in Toman
        const newLoan: Loan = {
            id: `loan${Date.now()}`,
            totalAmount: fundedAmount,
            remainingAmount: fundedAmount,
            installments: [
                { id: 'i1', amount: fundedAmount / 3, dueDate: new Date(Date.now() + 30 * 86400000), status: 'due' },
                { id: 'i2', amount: fundedAmount / 3, dueDate: new Date(Date.now() + 60 * 86400000), status: 'due' },
                { id: 'i3', amount: fundedAmount / 3, dueDate: new Date(Date.now() + 90 * 86400000), status: 'due' },
            ]
        };
        setLoans(prev => [...prev, newLoan]);
        setView('facilities');
    };
    
    const handlePayInstallment = (loanId: string, installmentId: string): boolean => {
        const loan = loans.find(l => l.id === loanId);
        if (!loan) return false;
        const installment = loan.installments.find(i => i.id === installmentId);
        if (!installment || installment.status === 'paid') return false;

        const installmentAmountInRials = installment.amount * 10;
        if (walletBalance >= installmentAmountInRials) {
            setWalletBalance(prev => prev - installmentAmountInRials);
            addTransaction({
                type: 'withdrawal',
                title: `پرداخت قسط وام`,
                amount: -installmentAmountInRials
            });

            const newLoans = loans.map(l => {
                if (l.id === loanId) {
                    return {
                        ...l,
                        remainingAmount: l.remainingAmount - installment.amount,
                        installments: l.installments.map(i => 
                            i.id === installmentId ? { ...i, status: 'paid' as InstallmentStatus } : i
                        )
                    };
                }
                return l;
            });
            setLoans(newLoans);
            return true;
        } else {
            return false;
        }
    };


    if (view === 'credit_flow') {
        return <CreditFlowPage 
            onBack={() => setView('facilities')} 
            walletBalance={walletBalance / 10} 
            setWalletBalance={(b) => setWalletBalance(b * 10)} 
            addTransaction={addTransaction}
            onGoToWallet={() => setView('wallet')}
            onSuccess={handleLoanSuccess}
        />;
    }

    if (view === 'facilities') {
        return <FacilitiesPage
            loans={loans}
            onBack={() => setView('main')}
            onGoToRequest={() => setView('credit_flow')}
            onViewDetails={(loanId) => {
                setSelectedLoanId(loanId);
                setView('loan_details');
            }}
        />;
    }

    const selectedLoan = loans.find(l => l.id === selectedLoanId);
    if (view === 'loan_details' && selectedLoan) {
        return <LoanDetailsPage
            loan={selectedLoan}
            onBack={() => setView('facilities')}
            onPayInstallment={handlePayInstallment}
            walletBalance={walletBalance}
        />;
    }

    if (view === 'wallet') {
        return <WalletPage 
            onBack={() => setView('main')}
            currentBalance={walletBalance}
            onCharge={handleCharge}
            transactions={transactions}
        />;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">مدیریت</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center">
                    <WalletIcon className="w-8 h-8 text-indigo-500 mb-2"/>
                    <h2 className="font-bold text-slate-800 dark:text-slate-200">کیف پول</h2>
                    <p className="font-semibold text-lg text-green-500 mt-1">{walletBalance.toLocaleString('fa')} ریال</p>
                    <button onClick={() => setView('wallet')} className="mt-3 w-full bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold py-2 rounded-lg text-sm hover:bg-indigo-200 dark:hover:bg-slate-600 transition-colors">
                        شارژ و مشاهده تاریخچه
                    </button>
                </div>
                 <button onClick={() => setView('facilities')} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <CreditCardIcon className="w-8 h-8 text-indigo-500 mb-2"/>
                    <h2 className="font-bold text-slate-800 dark:text-slate-200">تسهیلات</h2>
                    <p className="text-sm text-slate-500 mt-1">وام‌ها و اقساط</p>
                </button>
            </div>

            <InfoSection title="اطلاعات پروفایل">
                <p><strong>نام:</strong> علی رضایی</p>
                <p><strong>کد ملی:</strong> ۱۲۳۴۵۶۷۸۹۰</p>
            </InfoSection>

            <InfoSection title="اطلاعات حساب">
                <p><strong>شماره شبا:</strong> IR123456789012345678901234</p>
                <p><strong>بانک:</strong> ملت</p>
            </InfoSection>
            
            <InfoSection title="اطلاعات فروشگاه">
                <p><strong>نام فروشگاه:</strong> فروشگاه نمونه</p>
                <p><strong>آدرس:</strong> تهران، میدان آزادی، خیابان آزادی، پلاک ۱</p>
            </InfoSection>

            <div className="pt-6 text-center">
                <button 
                    onClick={logout}
                    className="w-full max-w-xs mx-auto bg-red-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-600 transition-colors duration-300">
                    خروج از حساب کاربری
                </button>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    نسخه اپلیکیشن: 1.1.0
                </p>
            </div>
        </div>
    );
};

export default ManagementPage;