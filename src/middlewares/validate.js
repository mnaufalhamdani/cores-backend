import { errorResponse } from '../utils/responseHandler.js';

/**
 * Middleware untuk validasi input dengan menggunakan Zod
 * @param {Object} schema - Schema object yang akan di validasi
 */
export default (schema) => (req, res, next) => {
  try {
     if (req.method === "POST") {
      const parsed = schema.parse(req.body);
      Object.keys(req.body).forEach(key => delete req.body[key]);
      Object.assign(req.body, parsed);
    } else if (req.method === "GET") {
      const parsed = schema.parse(req.query);
      Object.keys(req.query).forEach(key => delete req.query[key]);
      Object.assign(req.query, parsed);
    }
    next();
  } catch (error) {
    console.log(error.errors || error);

    let message;
    if (error.errors && Array.isArray(error.errors) && error.errors[0]) {
      // error dari Zod
      message = `${error.errors[0].message} in ${error.errors[0].path[0]}`;
    } else {
      // fallback, misal error bukan dari Zod
      if (error.message) {
        const messageDecode = JSON.parse(error.message);
        message = `${messageDecode[0].message} in ${messageDecode[0].path[0]}`;
      }else {
        message = "Invalid request";
      }
    }

    return errorResponse(res, { status: 400, message, validation: error.errors || null });
  }
};