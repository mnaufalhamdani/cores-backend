import { DateTime } from 'luxon';

export function utcToZone(utcDateStr, zone = 'Asia/Jakarta', format = 'yyyy-MM-dd HH:mm:ss') {
  const dt = DateTime.fromFormat(utcDateStr, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' });
  return dt.setZone(zone).toFormat(format);
}

export function zoneToUtc(zoneDateStr, zone = 'Asia/Jakarta', format = 'yyyy-MM-dd HH:mm:ss') {
  const dt = DateTime.fromFormat(zoneDateStr, 'yyyy-MM-dd HH:mm:ss', { zone: zone });
  return dt.toUTC().toFormat(format);
}
