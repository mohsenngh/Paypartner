import { useContext } from 'react';
import { RegistrationContext } from '../context/RegistrationContext';
import { RegistrationContextType } from '../types';

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
