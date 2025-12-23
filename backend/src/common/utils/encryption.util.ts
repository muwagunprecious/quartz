import * as CryptoJS from 'crypto-js';

/**
 * Utility functions for encrypting and decrypting sensitive data (NIN, etc.)
 * Uses AES encryption with a secret key from environment variables
 */

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-32-char-key-change-this';
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || 'default-16-iv-ch';

/**
 * Encrypt sensitive data (e.g., NIN)
 * @param plainText - The plain text to encrypt
 * @returns Encrypted string
 */
export function encrypt(plainText: string): string {
    if (!plainText) return '';

    try {
        const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
}

/**
 * Decrypt sensitive data (e.g., NIN)
 * @param cipherText - The encrypted text to decrypt
 * @returns Decrypted string
 */
export function decrypt(cipherText: string): string {
    if (!cipherText) return '';

    try {
        const decrypted = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
}

/**
 * Hash sensitive data for comparison (one-way)
 * @param data - The data to hash
 * @returns Hashed string
 */
export function hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
}

/**
 * Mask sensitive data for display (e.g., show only last 4 digits)
 * @param data - The data to mask
 * @param visibleChars - Number of characters to show at the end
 * @returns Masked string
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (!data || data.length <= visibleChars) return data;
    const masked = '*'.repeat(data.length - visibleChars);
    return masked + data.slice(-visibleChars);
}
