
export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    try{
      const accountSid = "";
      const authToken = "";
      const client = require('twilio')(accountSid, authToken);

      const response = await client.message.create({
        body: `your OTP is ${otp}`,
        from: '',
        to: toPhoneNumber
      })

      return response;
    }
    catch(err: any){
        console.log(err.message);
    }
}