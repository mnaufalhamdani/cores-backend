import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

/**
 * String to Encrypt
 * @param {string} str - teks yang akan dienkripsi
 * @param {string} secretKey - kunci rahasia untuk enkripsi
 * @param {number} length - panjang iv (initialization vector)
 * @returns {string} - teks yang telah dienkripsi
 */
export function stringToEncrypt(str, secretKey, length) {
  const iv = crypto.randomBytes(length);
  const key = Buffer.from(secretKey, 'hex');
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(str, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const ivBase64 = iv.toString('base64');
  return `${ivBase64}.${encrypted}`;
}

/**
 * Encrypt to String
 * @param {string} encrypt - teks yang akan didekripsi
 * @param {string} secretKey - kunci rahasia untuk enkripsi
 * @returns {string} - teks yang telah didekripsi
 */
export function encryptToString(encrypt, secretKey) {
  const [ivBase64, encrypted] = encrypt.split('.');
  const iv = Buffer.from(ivBase64, 'base64');
  const key = Buffer.from(secretKey, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * String to Base64
 * @param {string} text - teks yang akan dikonversi menjadi base64
 * @returns {string} - teks yang telah diubah menjadi base64
 */
export function stringToBase64(text) {
  return Buffer.from(text).toString('base64');
}

/**
 * Base64 to String
 * @param {string} encoded - teks yang akan dikonversi dari base64
 * @returns {string} - teks yang telah diubah dari base64
 */
export function base64ToString(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

/**
 * Generate Code Random
 * @param {string} text - teks yang akan di generate
 * @param {number} length - panjang kode yang akan di generate
 * @returns {string} - teks yang telah di generate
 */
export function generateCodeRandom(text, length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const base = `${text}${Math.random()}`;
  let total = 0;
  for (let i = 0; i < base.length; i++) {
    total += base.charCodeAt(i);
  }

  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt((total + i * 13) % chars.length);
  }
  return code;
}

/**
 * Get Base Url
 * @param {Object} req - objek request
 * @returns {string} - teks yang berisi url
 */
export function getBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

/**
 * Replace Text From Template
 * @param {string} text - teks yang akan di replace dari template (format: {{{key}}})
 * @param {Object} params - objek yang berisi {key-value}
 * @returns {string} - teks yang telah di replace dari template
 */
export function replaceTextFromTemplate(text, params) {
  return text.replace(/{{(.*?)}}/g, (_, key) => {
    const value = params[key.trim()];
    return value !== undefined ? value : '';
  });
}
