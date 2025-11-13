import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { sendRegistrationOtp } from '../api';

const RegistrationStep4Mobile: React.FC = () => {
  const { data, updateData, nextStep } = useRegistration();
  const [mobile, setMobile] = useState(data.mobile || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    setMobile(sanitizedValue);
  };
  
  const validate = (): boolean => {
    if (!mobile.startsWith('09') || mobile.length !== 11) {
      setError('شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.');
      return false;
    }
    setError('');
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await sendRegistrationOtp(mobile);
        updateData({ mobile });
        nextStep();
      } catch (err) {
        setError('خطا در ارسال کد. لطفا دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">شماره موبایل</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">شماره موبایل خود را جهت دریافت کد تایید وارد کنید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">شماره موبایل</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleChange}
            maxLength={11}
            placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
            className="w-full text-center p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
           {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        
        <div className="pt-4">
             <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? 'در حال ارسال کد...' : 'دریافت کد تایید'}
              </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep4Mobile;
