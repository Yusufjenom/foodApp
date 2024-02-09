import bcrypt from 'bcrypt';

export async function hashPassword(password: string){
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};