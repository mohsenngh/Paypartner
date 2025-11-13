import React, { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import ImageUpload from '../components/ImageUpload';

const businessCategories = [
    "پوشاک", "رستوران و کافه", "سوپرمارکت و خواربار", "لوازم خانگی", "آرایشی و بهداشتی", 
    "پزشکی و سلامت", "آموزشی", "خدمات فنی", "سایر"
];

const RegistrationStep9BusinessLicense: React.FC = () => {
    const { data, updateData, nextStep } = useRegistration();
    const [category, setCategory] = useState(data.businessCategory || '');
    const [licenseImage, setLicenseImage] = useState<File | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!category) {
            setError('لطفا صنف خود را انتخاب کنید.');
            return;
        }
        if (!licenseImage) {
            setError('لطفا تصویر پروانه کسب را بارگذاری کنید.');
            return;
        }
        
        updateData({ businessCategory: category, businessLicenseImage: licenseImage });
        nextStep();
    };
    
    return (
        <div className="animate-fade-in space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">اطلاعات کسب و کار</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">صنف خود را انتخاب و پروانه کسب را بارگذاری کنید.</p>
            </div>

             <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div>
                    <label htmlFor="business-category" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        انتخاب صنف
                    </label>
                    <select
                        id="business-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        <option value="" disabled>صنف خود را انتخاب کنید</option>
                        {businessCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <ImageUpload 
                    id="business-license" 
                    label="بارگذاری پروانه کسب"
                    onFileSelect={setLicenseImage} 
                />
                
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                
                <div className="pt-2">
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

export default RegistrationStep9BusinessLicense;