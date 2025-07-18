/**
 * Success response handler
 * @param {object} res - response object
 * @returns {object} response object
 */
export const successResponse = (res, {
  status = 200,
  message = null,
  data = null
}) => {
  const response = {
    status,
    messages: message,
    data: data,
  };
  return res.status(status).json(response);
};

/**
 * Error response handler
 * @param {object} res - response object
 * @returns {object} response object
 */
export const errorResponse = (res, {
  status = 401,
  message = null,
  validation = null,
}) => {
  const response = {
    status,
    messages: message,
    validation: validation,
  };
  return res.status(status).json(response);
};
