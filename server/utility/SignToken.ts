const jwt = require('jsonwebtoken');

const period: number = 60 * 60 * 24

export async function SignToken(id: string) {
    try {
        const token = await jwt.sign({ id }, "secret", { expiresIn: period });
        return token;
    } catch (err: any) {
        return err.message;
    }

};

export async function VerifyToken(token: string) {
    try {
        const verified = await jwt.verify(token, "secret");
        return verified;
    }
    catch (err: any) {
        return err.message;
    }

};