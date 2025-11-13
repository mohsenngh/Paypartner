import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';

const RegistrationStep6NationalId: React.FC = () => {
  const { data, updateData, nextStep } = useRegistration();
  const [nationalId, setNationalId] = useState(data.nationalId || '');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    setNationalId(sanitizedValue);
  };
  
  const validate = (): boolean => {
    if (nationalId.length !== 10) {
      setError('کد ملی باید ۱۰ رقم باشد.');
      return false;
    }
    setError('');
    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      updateData({ nationalId });
      nextStep();
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">اطلاعات هویتی</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">کد ملی خود را وارد کنید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="nationalId" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">کد ملی</label>
          <input
            type="tel"
            id="nationalId"
            name="nationalId"
            value={nationalId}
            onChange={handleChange}
            maxLength={10}
            placeholder="کد ملی ۱۰ رقمی"
            className="w-full text-center p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        
        <div className="pt-4">
             <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
              >
                مرحله بعد
              </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep6NationalId;
