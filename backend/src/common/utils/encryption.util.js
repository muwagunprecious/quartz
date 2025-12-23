"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.hash = hash;
exports.maskSensitiveData = maskSensitiveData;
var CryptoJS = require("crypto-js");
/**
 * Utility functions for encrypting and decrypting sensitive data (NIN, etc.)
 * Uses AES encryption with a secret key from environment variables
 */
var ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-32-char-key-change-this';
var ENCRYPTION_IV = process.env.ENCRYPTION_IV || 'default-16-iv-ch';
/**
 * Encrypt sensitive data (e.g., NIN)
 * @param plainText - The plain text to encrypt
 * @returns Encrypted string
 */
function encrypt(plainText) {
    if (!plainText)
        return '';
    try {
        var encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY).toString();
        return encrypted;
    }
    catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
}
/**
 * Decrypt sensitive data (e.g., NIN)
 * @param cipherText - The encrypted text to decrypt
 * @returns Decrypted string
 */
function decrypt(cipherText) {
    if (!cipherText)
        return '';
    try {
        var decrypted = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
}
/**
 * Hash sensitive data for comparison (one-way)
 * @param data - The data to hash
 * @returns Hashed string
 */
function hash(data) {
    return CryptoJS.SHA256(data).toString();
}
/**
 * Mask sensitive data for display (e.g., show only last 4 digits)
 * @param data - The data to mask
 * @param visibleChars - Number of characters to show at the end
 * @returns Masked string
 */
function maskSensitiveData(data, visibleChars) {
    if (visibleChars === void 0) { visibleChars = 4; }
    if (!data || data.length <= visibleChars)
        return data;
    var masked = '*'.repeat(data.length - visibleChars);
    return masked + data.slice(-visibleChars);
}
