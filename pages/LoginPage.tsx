import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon } from '../components/icons';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const [step, setStep] = useState<'nationalId' | 'otp'>('nationalId');
  const [nationalId, setNationalId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleNationalIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nationalId.length !== 10) {
      setError('کد ملی باید ۱۰ رقم باشد.');
      return;
    }
    setError('');
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setStep('otp');
  };
  
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('کد تایید باید ۶ رقم باشد.');
      return;
    }
    setError('');
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    // On success:
    login();
  };


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col p-4">
      <header className="flex-shrink-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
          <ChevronLeftIcon className="w-6 h-6 transform -scale-x-100" />
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          {step === 'nationalId' ? (
            <>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">ورود به حساب کاربری</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">کد ملی خود را وارد کنید.</p>
              <form onSubmit={handleNationalIdSubmit} className="space-y-6">
                <input
                  type="tel"
                  maxLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  placeholder="کد ملی ۱۰ رقمی"
                  className="w-full text-center tracking-[0.5em] text-lg p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
                 {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'در حال ارسال...' : 'دریافت کد تایید'}
                </button>
              </form>
            </>
          ) : (
             <>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">کد تایید را وارد کنید</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">کد تایید ۶ رقمی به شماره ۰۹۱۲***۵۶۷۸ ارسال شد.</p>
              <form onSubmit={handleOtpSubmit}>
                 <div className="flex justify-center gap-2" dir="ltr">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={data}
                      onChange={e => handleOtpChange(e.target, index)}
                      onFocus={e => e.target.select()}
                      className="w-12 h-14 text-center text-2xl font-bold bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      required
                    />
                  ))}
                </div>
                 {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'در حال بررسی...' : 'ورود'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
