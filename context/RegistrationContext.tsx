import React, { createContext, useState, ReactNode } from 'react';
import { RegistrationData, RegistrationContextType } from '../types';

export const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>({});

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const reset = () => {
    setStep(1);
    setData({});
  };

  const value = { step, data, nextStep, prevStep, updateData, goToStep, reset };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};