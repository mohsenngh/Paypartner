import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { IdDocType } from '../types';
import { CreditCardIcon, DocumentTextIcon } from '../components/icons';
import ImageUpload from '../components/ImageUpload';

const SelectionCard: React.FC<{ title: string, Icon: React.FC<{className?: string}>, onClick: () => void, selected: boolean }> = 
({ title, Icon, onClick, selected }) => (
  <button 
    onClick={onClick}
    className={`w-full text-right bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-2 transition-all duration-300 flex items-center space-i-4
    ${selected ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-transparent hover:border-indigo-400'}`}
  >
    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
        <Icon className="w-7 h-7 text-indigo-500" />
    </div>
    <h3 className="font-bold text-slate-800 dark:text-slate-200">{title}</h3>
  </button>
);

const RegistrationStep8IdDocs: React.FC = () => {
  const { data, updateData, nextStep } = useRegistration();
  const [docType, setDocType] = useState<IdDocType | undefined>(data.idDocType);
  
  // Local state for files and inputs
  const [idCardFront, setIdCardFront] = useState<File | null>(null);
  const [idCardBack, setIdCardBack] = useState<File | null>(null);
  const [trackingCode, setTrackingCode] = useState(data.idCertificateTrackingCode || '');
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSelect = (type: IdDocType) => {
    setDocType(type);
    updateData({ idDocType: type });
    setError(''); // Clear errors when switching
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!docType) {
        setError('لطفا نوع مدرک شناسایی را انتخاب کنید.');
        return;
    }

    if (docType === 'smartCard') {
        if (!idCardFront || !idCardBack) {
            setError('لطفا تصویر پشت و روی کارت ملی را بارگذاری کنید.');
            return;
        }
        updateData({ idCardFront, idCardBack });
    }

    if (docType === 'certificate') {
        if (!trackingCode) {
            setError('لطفا کد رهگیری را وارد کنید.');
            return;
        }
        if (!birthCertificate) {
            setError('لطفا تصویر صفحه اول شناسنامه را بارگذاری کنید.');
            return;
        }
        updateData({ idCertificateTrackingCode: trackingCode, birthCertificate });
    }
    
    nextStep();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">بارگذاری مدارک هویتی</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">لطفا نوع مدرک و تصاویر مربوطه را بارگذاری کنید.</p>
      </div>

      <div className="space-y-4">
          <SelectionCard 
            title="کارت ملی هوشمند"
            Icon={CreditCardIcon}
            onClick={() => handleSelect('smartCard')}
            selected={docType === 'smartCard'}
          />
          <SelectionCard 
            title="گواهی کارت ملی هوشمند"
            Icon={DocumentTextIcon}
            onClick={() => handleSelect('certificate')}
            selected={docType === 'certificate'}
          />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {docType === 'smartCard' && (
            <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg animate-fade-in">
                <ImageUpload id="id-card-front" label="تصویر روی کارت ملی" onFileSelect={setIdCardFront} />
                <ImageUpload id="id-card-back" label="تصویر پشت کارت ملی" onFileSelect={setIdCardBack} />
            </div>
        )}

        {docType === 'certificate' && (
             <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg animate-fade-in">
                <div>
                    <label htmlFor="trackingCode" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">کد رهگیری کارت ملی هوشمند</label>
                    <input
                        type="text"
                        id="trackingCode"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="کد رهگیری ثبت‌نام را وارد کنید"
                        className="w-full text-center p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                <ImageUpload id="birth-cert" label="تصویر صفحه اول شناسنامه" onFileSelect={setBirthCertificate} />
            </div>
        )}

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

export default RegistrationStep8IdDocs;