import * as bcrypt from 'bcryptjs';

export class PasswordHelper {
    static async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    static checkPasswordFormat(password: string): boolean {
        return /^(?!.* )(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}



