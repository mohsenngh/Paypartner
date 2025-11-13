import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';

const RegistrationStep7BirthDate: React.FC = () => {
  const { data, updateData, nextStep } = useRegistration();
  const [birthDate, setBirthDate] = useState({
    year: data.birthDate?.split('/')[0] || '1370',
    month: data.birthDate?.split('/')[1] || '01',
    day: data.birthDate?.split('/')[2] || '01',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthDate(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!birthDate.year || !birthDate.month || !birthDate.day) {
        setError('لطفا تاریخ تولد را کامل انتخاب کنید.');
        return;
    }
    const formattedDate = `${birthDate.year}/${birthDate.month}/${birthDate.day}`;
    updateData({ birthDate: formattedDate });
    nextStep();
  };

  const currentYear = new Date().getFullYear() - 621; // Convert to Jalali approx.
  const years = Array.from({ length: 70 }, (_, i) => currentYear - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const selectClassName = "w-full text-center p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none";

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">تاریخ تولد</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">تاریخ تولد خود را مطابق با کارت ملی وارد کنید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center gap-3">
            <div className="flex-1">
                <label htmlFor="day" className="block text-sm text-center font-medium text-slate-600 dark:text-slate-400 mb-1">روز</label>
                <select id="day" name="day" value={birthDate.day} onChange={handleChange} className={selectClassName}>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            <div className="flex-1">
                 <label htmlFor="month" className="block text-sm text-center font-medium text-slate-600 dark:text-slate-400 mb-1">ماه</label>
                <select id="month" name="month" value={birthDate.month} onChange={handleChange} className={selectClassName}>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
            <div className="flex-1">
                <label htmlFor="year" className="block text-sm text-center font-medium text-slate-600 dark:text-slate-400 mb-1">سال</label>
                <select id="year" name="year" value={birthDate.year} onChange={handleChange} className={selectClassName}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        </div>
          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
        
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

export default RegistrationStep7BirthDate;
