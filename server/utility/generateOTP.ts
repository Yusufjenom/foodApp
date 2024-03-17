

export const genOTP  = async () => {
    let digit = '0123456789';
    let otp = Number(digit.split('').sort(() => Math.random() - 0.5).join('').slice(-6));
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))
    return {otp, expiry};
};