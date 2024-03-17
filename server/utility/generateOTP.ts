

export const genOTP  = () => {
    let digit = '0123456789';
    let newDigit = digit.split('').sort(() => Math.random() - 0.5).join('').slice(-6);
    return newDigit;
};