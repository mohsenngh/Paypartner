import React, { useState, useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { lookupPostalCode } from '../api';
import { BuildingStorefrontIcon, UserIcon } from '../components/icons';

const AddressCard: React.FC<{ title: string, postalCode: string, Icon: React.FC<{className?: string}> }> = ({ title, postalCode, Icon }) => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            setLoading(true);
            const result = await lookupPostalCode(postalCode);
            setAddress(result);
            setLoading(false);
        };
        if (postalCode) {
            fetchAddress();
        }
    }, [postalCode]);

    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center space-i-3 mb-2">
                <Icon className="w-6 h-6 text-indigo-500" />
                <p className="font-bold text-slate-800 dark:text-slate-200">{title}</p>
            </div>
            {loading ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">در حال استعلام...</p>
            ) : (
                <p className="text-sm text-slate-600 dark:text-slate-400">{address}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1" dir="ltr">کد پستی: {postalCode}</p>
        </div>
    );
};

const RegistrationStep14ConfirmAddress: React.FC = () => {
    const { data, nextStep } = useRegistration();

    return (
        <div className="animate-fade-in space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">تایید آدرس</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">آدرس‌های استعلام شده را بررسی و تایید کنید.</p>
            </div>

            <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                {data.storePostalCode && (
                    <AddressCard title="آدرس فروشگاه" postalCode={data.storePostalCode} Icon={BuildingStorefrontIcon} />
                )}
                 {data.residentialPostalCode && (
                    <AddressCard title="آدرس محل سکونت" postalCode={data.residentialPostalCode} Icon={UserIcon} />
                )}
            </div>
            
            <div className="pt-2">
                <button
                    onClick={nextStep}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg text-lg"
                >
                    آدرس‌ها مورد تایید است
                </button>
            </div>
        </div>
    );
};

export default RegistrationStep14ConfirmAddress;
