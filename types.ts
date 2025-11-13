export enum Page {
  Reports = 'گزارشات',
  Support = 'پشتیبانی',
  Services = 'سرویس‌های کاربردی',
  Sales = 'فروش',
  Management = 'مدیریت',
}

// Registration Types
export type ServiceType = 'pos' | 'gateway';
export type EntityType = 'individual' | 'legal';
export type IdDocType = 'smartCard' | 'certificate';

export interface SettlementAccount {
  accountNumber: string; // Could be IBAN or card number
  sharePercentage: number;
}

export interface RegistrationData {
  serviceType?: ServiceType;
  entityType?: EntityType;
  mobile?: string;
  nationalId?: string;
  birthDate?: string;

  // Step 8
  idDocType?: IdDocType;
  idCardFront?: File;
  idCardBack?: File;
  idCertificateTrackingCode?: string;
  birthCertificate?: File;

  // Step 9
  businessCategory?: string;
  businessLicenseImage?: File;

  // Step 10
  settlementAccounts?: SettlementAccount[];
  
  // Step 12
  taxCode?: string;

  // Step 13
  storePostalCode?: string;
  storePhoneNumber?: string;
  residentialAddressSameAsStore?: boolean;
  residentialPostalCode?: string;
  residentialPhoneNumber?: string;
  
  // Step 15
  contractAccepted?: boolean;
}

export interface RegistrationContextType {
  step: number;
  data: RegistrationData;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<RegistrationData>) => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

// Sales Page Types
export type BusinessRegistrationStatus = 'none' | 'pending' | 'active';
export interface BusinessRegistrationData {
  storeName: string;
  description: string;
  logo?: File;
  gallery: File[];
}

// Discount and Coupon Types
export type DiscountStatus = 'active' | 'scheduled' | 'expired';
export type DiscountScope = 'all' | 'category' | 'product';

export interface Discount {
  id: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
  scope: DiscountScope;
  scopeDetail?: string; // e.g., category name or product ID
  status: DiscountStatus;
}

export type CouponCondition = 'first_order' | 'min_purchase' | 'specific_product';
export type CouponType = 'free_shipping' | 'discount' | 'gift';

export interface Coupon {
  id: string;
  code: string;
  condition: CouponCondition;
  conditionValue?: number | string; // e.g., min purchase amount
  type: CouponType;
  discountValue?: number; // percentage or fixed amount
  maxDiscount?: number;
  expiryDate: Date;
}

// Management Page - Credit Flow Types
export type CreditRequestStatus = 'idle' | 'pending_payment' | 'verifying' | 'denied' | 'approved' | 'contract_signed' | 'funded';
export interface CreditRequest {
  status: CreditRequestStatus;
  verificationFeePaid: boolean;
  creditScoreOk: boolean;
  membershipDurationOk: boolean;
  creditLimit: number;
  requestedAmount: number;
  serviceFee: number;
}

// Loan and Installment Types
export type InstallmentStatus = 'paid' | 'due';
export interface Installment {
  id: string;
  amount: number; // in Toman
  dueDate: Date;
  status: InstallmentStatus;
}
export interface Loan {
  id: string;
  totalAmount: number; // in Toman
  remainingAmount: number; // in Toman
  installments: Installment[];
}

// Wallet Transaction Type
export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  title: string;
  amount: number; // in Rials
  date: Date;
}