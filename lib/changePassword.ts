import { resetPassword, verifyOTP as verifyOTPAPI } from '@/api/authenticationAPI'

export const verifyOTP = async (phone: string, otp: string) => {
    await verifyOTPAPI(phone, otp)
}

export const changePassword = async (phone: string, newPwd: string) => {
    await resetPassword(phone, newPwd)
} 
