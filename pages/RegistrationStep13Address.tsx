import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';

const RegistrationStep13Address: React.FC = () => {
  const { data, updateData, nextStep } = useRegistration();
  const [storePostalCode, setStorePostalCode] = useState(data.storePostalCode || '');
  const [storePhoneNumber, setStorePhoneNumber] = useState(data.storePhoneNumber || '');
  const [isSameAddress, setIsSameAddress] = useState(data.residentialAddressSameAsStore || false);
  const [residentialPostalCode, setResidentialPostalCode] = useState(data.residentialPostalCode || '');
  const [residentialPhoneNumber, setResidentialPhoneNumber] = useState(data.residentialPhoneNumber || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (storePostalCode.length !== 10) {
        setError('کد پستی فروشگاه باید ۱۰ رقم باشد.');
        return;
    }
    if (!storePhoneNumber) {
        setError('تلفن ثابت فروشگاه را وارد کنید.');
        return;
    }
    if (!isSameAddress) {
        if (residentialPostalCode.length !== 10) {
            setError('کد پستی محل سکونت باید ۱۰ رقم باشد.');
            return;
        }
        if (!residentialPhoneNumber) {
            setError('تلفن ثابت محل سکونت را وارد کنید.');
            return;
        }
    }

    const residentialData = isSameAddress ? {
        residentialPostalCode: storePostalCode,
        residentialPhoneNumber: storePhoneNumber,
    } : {
        residentialPostalCode,
        residentialPhoneNumber,
    };

    updateData({ 
        storePostalCode, 
        storePhoneNumber, 
        residentialAddressSameAsStore: isSameAddress,
        ...residentialData
    });
    nextStep();
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSameAddress(e.target.checked);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">اطلاعات آدرس</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">آدرس فروشگاه و محل سکونت خود را وارد کنید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        {/* Store Address */}
        <div className="space-y-4">
            <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">آدرس فروشگاه</h3>
            <div>
                <label htmlFor="storePostalCode" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">کد پستی</label>
                <input type="tel" id="storePostalCode" value={storePostalCode} onChange={(e) => setStorePostalCode(e.target.value.replace(/\D/g, ''))} maxLength={10} placeholder="کد پستی ۱۰ رقمی" className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg"/>
            </div>
             <div>
                <label htmlFor="storePhoneNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">تلفن ثابت</label>
                <input type="tel" id="storePhoneNumber" value={storePhoneNumber} onChange={(e) => setStorePhoneNumber(e.target.value)} placeholder="همراه با کد شهر" className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg"/>
            </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />
        
        {/* Residential Address */}
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                 <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">آدرس محل سکونت</h3>
                 <div className="flex items-center">
                    <input id="same-address" type="checkbox" checked={isSameAddress} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"/>
                    <label htmlFor="same-address" className="ms-2 block text-sm text-slate-900 dark:text-slate-300">با آدرس فروشگاه یکسان است</label>
                </div>
            </div>
            {!isSameAddress && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label htmlFor="residentialPostalCode" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">کد پستی</label>
                        <input type="tel" id="residentialPostalCode" value={residentialPostalCode} onChange={(e) => setResidentialPostalCode(e.target.value.replace(/\D/g, ''))} maxLength={10} placeholder="کد پستی ۱۰ رقمی" className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="residentialPhoneNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">تلفن ثابت</label>
                        <input type="tel" id="residentialPhoneNumber" value={residentialPhoneNumber} onChange={(e) => setResidentialPhoneNumber(e.target.value)} placeholder="همراه با کد شهر" className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg"/>
                    </div>
                </div>
            )}
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        
        <div className="pt-2">
             <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg">
                مرحله بعد
              </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep13Address;
