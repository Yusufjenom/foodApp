
import bcrypt from 'bcrypt';


export async function ComfirmPassword(password: string, savedPassword: string){
  const correctPassword = await bcrypt.compare(password, savedPassword);
  return correctPassword
}