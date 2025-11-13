import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { verifyOtp } from '../api';

const RegistrationStep5Otp: React.FC = () => {
  const { data, nextStep } = useRegistration();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('کد تایید باید ۶ رقم باشد.');
      return;
    }
    setError('');
    setLoading(true);
    try {
        const isVerified = await verifyOtp(fullOtp);
        if (isVerified) {
            nextStep();
        } else {
            setError('کد وارد شده صحیح نیست.');
        }
    } catch (err) {
        setError('خطا در تایید کد. لطفا دوباره تلاش کنید.');
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="animate-fade-in space-y-6">
       <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">کد تایید را وارد کنید</h1>
        <p className="text-slate-500 dark:text-slate-400">کد تایید ۶ رقمی به شماره <span dir="ltr" className="font-semibold">{data.mobile}</span> ارسال شد.</p>
       </div>
       <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
           <div className="flex justify-center gap-2" dir="ltr">
            {otp.map((data, index) => (
              <input
                key={index}
                type="tel"
                maxLength={1}
                value={data}
                onChange={e => handleOtpChange(e.target, index)}
                onFocus={e => e.target.select()}
                className="w-12 h-14 text-center text-2xl font-bold bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            ))}
          </div>
           {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
          <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? 'در حال بررسی...' : 'تایید و ادامه'}
              </button>
          </div>
           <div className="text-center">
               <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    ارسال مجدد کد
               </button>
           </div>
       </form>
    </div>
  );
};

export default RegistrationStep5Otp;
