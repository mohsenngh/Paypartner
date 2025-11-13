// This file will be used to simulate API calls.

/**
 * Simulates sending an OTP to a user's mobile number.
 * @param nationalId The user's national ID.
 * @returns A promise that resolves on successful sending.
 */
export const sendOtp = (nationalId: string): Promise<void> => {
  console.log(`Sending OTP for national ID: ${nationalId}`);
  return new Promise(resolve => setTimeout(resolve, 1500));
};

/**
 * Simulates sending an OTP to a user's mobile number for registration.
 * @param mobile The user's mobile number.
 * @returns A promise that resolves on successful sending.
 */
export const sendRegistrationOtp = (mobile: string): Promise<void> => {
  console.log(`Sending OTP for registration to mobile: ${mobile}`);
  return new Promise(resolve => setTimeout(resolve, 1500));
};


/**
 * Simulates verifying an OTP.
 * @param otp The 6-digit code.
 * @returns A promise that resolves with true for success, false for failure.
 */
export const verifyOtp = (otp: string): Promise<boolean> => {
  console.log(`Verifying OTP: ${otp}`);
  return new Promise(resolve => setTimeout(() => resolve(otp === '123456'), 1500)); // Mock success if OTP is 123456
};

/**
 * Simulates looking up an address from a postal code.
 * @param postalCode The 10-digit postal code.
 * @returns A promise that resolves with a mock address string.
 */
export const lookupPostalCode = (postalCode: string): Promise<string> => {
  console.log(`Looking up postal code: ${postalCode}`);
  return new Promise(resolve => setTimeout(() => resolve('تهران، میدان آزادی، خیابان آزادی، پلاک ۱'), 2000));
};