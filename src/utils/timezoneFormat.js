import { DateTime } from 'luxon';

/**
 * UTC to Zone
 * @param {string} utcDateStr - UTC date string (yyyy-MM-dd HH:mm:ss)
 * @param {string} zone - zone name (default: 'Asia/Jakarta')
 * @param {string} format - format output (default: 'yyyy-MM-dd HH:mm:ss')
 * @returns {string} - tanggal dan waktu dalam format yang ditentukan
 */
export function utcToZone(utcDateStr, zone = 'Asia/Jakarta', format = 'yyyy-MM-dd HH:mm:ss') {
  const dt = DateTime.fromFormat(utcDateStr, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' });
  return dt.setZone(zone).toFormat(format);
}

/**
 * Zone to UTC
 * @param {string} zoneDateStr - zone date string (yyyy-MM-dd HH:mm:ss)
 * @param {string} zone - zone name (default: 'Asia/Jakarta')
 * @param {string} format - format output (default: 'yyyy-MM-dd HH:mm:ss')
 * @returns {string} - tanggal dan waktu dalam format yang ditentukan
 */
export function zoneToUtc(zoneDateStr, zone = 'Asia/Jakarta', format = 'yyyy-MM-dd HH:mm:ss') {
  const dt = DateTime.fromFormat(zoneDateStr, 'yyyy-MM-dd HH:mm:ss', { zone: zone });
  return dt.toUTC().toFormat(format);
}
