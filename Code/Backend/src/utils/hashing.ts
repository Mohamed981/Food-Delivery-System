import * as bcrypt from 'bcrypt';


export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return {hash, salt};
}



export async function isPasswordCorrect(inputPassword: string, hashedPassword: string, salt: string ) {
    const password = await bcrypt.hash(inputPassword, salt);
    return password === hashedPassword;
}

 