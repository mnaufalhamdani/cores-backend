import { DateTime } from 'luxon';
/**
 * Middleware to set request metadata from headers.
 * 
 * Populates `req.meta` with language, timezone, and datetime information
 * extracted from incoming request headers. Defaults are provided if headers
 * are not specified.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export default (req, res, next) => {
  const dateNow = DateTime.utc(); 
  req.meta = {
    acceptLanguage: req.headers['accept-language'] || 'id_ID',
    timezone: req.headers['timezone'] || 'Asia/Jakarta',
    dateTime: dateNow.toFormat('yyyy-MM-dd HH:mm:ss')
  };
  next();
};