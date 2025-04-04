import crypto from 'crypto';

export function generateHashValue(value: string) {
    const hash = crypto.createHash('sha256').update(value).digest('hex');

    const referralCode = hash.substring(0, 16);
    return referralCode;
}