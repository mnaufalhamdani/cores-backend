import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

export function stringToEncrypt(str, secretKey, length) {
  const iv = crypto.randomBytes(length);
  const key = Buffer.from(secretKey, 'hex');
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(str, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const ivBase64 = iv.toString('base64');
  return `${ivBase64}.${encrypted}`;
}

export function encryptToString(encrypt, secretKey) {
  const [ivBase64, encrypted] = encrypt.split('.');
  const iv = Buffer.from(ivBase64, 'base64');
  const key = Buffer.from(secretKey, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function stringToBase64(text) {
  return Buffer.from(text).toString('base64');
}

export function base64ToString(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

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

export function getBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

export function replaceTextFromTemplate(text, params) {
  return text.replace(/{{(.*?)}}/g, (_, key) => {
    const value = params[key.trim()];
    return value !== undefined ? value : '';
  });
}
