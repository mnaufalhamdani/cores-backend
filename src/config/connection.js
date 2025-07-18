
/**
 * Connect to database
 * @param {object} db - pool database yang akan digunakan
 * @returns {Promise<import('mysql2/promise')>} - hasil pool yang telah diinisialisasi
 */
export default async function connection(db) {
    try {
        const conn = await db.getConnection();
        return conn;
    } catch (err) {
        if (err.code === 'ECONNREFUSED') {
            throw { status: 503, message: 'Database service unavailable. Please try again later.' };
        }

        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            throw { status: 401, message: 'Invalid database credentials.' };
        }

        throw { status: 401, message: 'Internal server error when connecting to database.' };
    }
};
