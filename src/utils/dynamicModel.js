import { DateTime } from 'luxon';

/**
 * Insert Data
 * @param {import('mysql2/promise').Connection} conn - koneksi mysql
 * @param {string} table - nama tabel
 * @param {Object} data - data {key-value}
 * @returns {Promise<import('mysql2/promise').OkPacket>} - hasil eksekusi query
 * @throws {Error} - jika terjadi kesalahan
 */
export const insertData = async (conn, table, data) => {
  try {
    const dateTimeUtc = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
    const payload = { ...data, created_at: dateTimeUtc, updated_at: dateTimeUtc };

    const columns = Object.keys(payload).join(', ');
    const values = Object.values(payload).map(val => val === undefined ? null : val);;
    const placeholders = Object.keys(payload).map(() => '?').join(', ');
    const updateClause = Object.keys(payload)
      .filter(element => element !== 'created_at')
      .map(element => `${element} = VALUES(${element})`)
      .join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updateClause}`;
    const [result] = await conn.execute(sql, values);
    // @ts-ignore
    return result;
  }catch (error) {
    console.error('Error in insertData:', error);
    throw error;
  }
};

/**
 * Update Data
 * @param {import('mysql2/promise').Connection} conn - koneksi mysql
 * @param {string} table - nama tabel
 * @param {Object} whereClause - kondisi untuk update {key-value}
 * @param {Object} data - data {key-value}
 * @returns {Promise<import('mysql2/promise').OkPacket>} - hasil eksekusi query
 * @throws {Error} - jika terjadi kesalahan
 */
export const updateData = async (conn, table, whereClause, data) => {
  try {
    const dateTimeUtc = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
    const payload = { ...data, updated_at: dateTimeUtc };

    const safeValues = arr => arr.map(v => (typeof v === 'undefined' ? null : v));
    const setClause = Object.keys(payload).map(col => `${col} = ?`).join(', ');
    const whereStr = Object.keys(whereClause).map(col => `${col} = ?`).join(' AND ');

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereStr}`;
    const params = safeValues([...Object.values(payload), ...Object.values(whereClause)]);

    const [result] = await conn.execute(sql, params);
    // @ts-ignore
    return result.affectedRows;
  }catch (error) {
    console.error('Error in updateData:', error);
    throw error;
  }
};

/**
 * Delete Data
 * @param {import('mysql2/promise').Connection} conn - koneksi mysql
 * @param {string} table - nama tabel
 * @param {Object} whereClause - kondisi untuk update {key-value}
 * @returns {Promise<import('mysql2/promise').OkPacket>} - hasil eksekusi query
 * @throws {Error} - jika terjadi kesalahan
 */
export const deleteData = async (conn, table, whereClause) => {
  try {
    // Cek kolom mana yang undefined
    const undefinedKeys = Object.entries(whereClause)
      .filter(([_, value]) => value === undefined)
      .map(([key]) => key);

    if (undefinedKeys.length > 0) {
      throw { status: 403, message: `Invalid column [${undefinedKeys.join(', ')}]` };
    }

    const whereStr = Object.keys(whereClause).map(col => `${col} = ?`).join(' AND ');
    const sql = `DELETE FROM ${table} WHERE ${whereStr}`;
    const [result] = await conn.execute(sql, Object.values(whereClause));
    // @ts-ignore
    return result.affectedRows;
  }catch (error) {
    console.error('Error in deleteData:', error);
    throw error;
  }
};

/**
 * Generate kode unik berdasarkan pengecekan data yang sudah ada
 * @param {import('mysql2/promise').Connection} db - koneksi mysql
 * @param {string} tableName - nama tabel
 * @param {Object} [options] - nama kolom yang digunakan untuk pengecekan {key}
 * @returns {Promise<import('mysql2/promise').OkPacket>} - hasil eksekusi query
 * @throws {Error} - jika terjadi kesalahan
 */
export const generateCode = async (db, tableName, options = {}) => {
  const { id = 'id' } = options;
  const date = DateTime.utc().toFormat('yyMMdd'); // 'yymmdd'
  const datePart = date; // misal: '250620'
  let total = 0;

  // Hitung jumlah data yang mengandung awalan tanggal (misalnya '250620')
  let [rows] = await db.query(
    `SELECT COALESCE(COUNT(${id}), 0) AS count FROM ${tableName} WHERE ${id} LIKE ? LIMIT 1`, [`${datePart}%`]
  );

  if (rows[0].count > 0) {
    console.log("2");
    // Ambil ID terakhir (terbesar) yang mengandung tanggal hari ini
    const [lastRow] = await db.query(
      `SELECT ${id} FROM ${tableName} WHERE ${id} LIKE ? ORDER BY ${id} DESC LIMIT 1`, [`${datePart}%`]
    );
    const lastId = lastRow[0][id].toString();
    total = parseInt(lastId.slice(-3), 10); // ambil 3 digit terakhir
  }

  const newCode = `${datePart}${String(total + 1).padStart(3, '0')}`;
  // @ts-ignore
  return newCode;
};

/**
 * Generate urutan angka berdasarkan pengecekan data yang sudah ada
 * @param {import('mysql2/promise').Connection} db - koneksi mysql
 * @param {string} tableName - nama tabel
 * @param {string} columnName - nama kolom yang digunakan untuk pengecekan
 * @param {string} id - nilai ID yang digunakan untuk pengecekan
 * @returns {Promise<import('mysql2/promise').OkPacket>} - hasil eksekusi query
 * @throws {Error} - jika terjadi kesalahan
 */
export const generateUrutan = async (db, tableName, columnName, id) => {
  const [rows] = await db.query(`
    SELECT COALESCE(COUNT(${columnName}), 0) AS count
    FROM ${tableName}
    WHERE ${columnName} = ?
  `, [id]);

  const urutan = (rows[0]?.count || 0) + 1;
  return urutan;
};
