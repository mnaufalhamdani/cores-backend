# Cores Backend Shared Module
[![NPM version](https://badgen.net/npm/v/@mnaufalhamdani/cores-backend)](https://www.npmjs.com/package/@mnaufalhamdani/cores-backend)

Modul Node.js berbasis ESM yang berisi utilitas backend umum, seperti koneksi database, middleware, dan fungsi dinamis yang bisa digunakan ulang pada berbagai project Express.js / backend JavaScript.

## Install
```bash
npm install @mnaufalhamdani/cores-backend
```

## 🚀 Cara Penggunaan di Project Lain
Untuk menggunakan modul ini di project lain, Bisa lakukan import seperti berikut:
```bash
import {
  connection,               # fungsi koneksi database
  header,                   # middleware untuk mengecek dan atur header
  validate,                 # middleware untuk mengecek validasi body dan query
  insertData,               # fungsi untuk insert data
  updateData,               # fungsi untuk update data
  deleteData,               # fungsi untuk delete data
  generateCode,             # fungsi untuk generate code (kode: yyMMddXXX) - urutan 3 digit terakhir
  generateUrutan,           # fungsi untuk generate urutan (urutan nomor)
  stringToEncrypt,          # fungsi untuk enkripsi string menggunakan AES dengan kunci rahasia
  encryptToString,          # fungsi untuk enkripsi string menggunakan AES dengan kunci rahasia dan mengubah menjadi string
  stringToBase64,           # fungsi untuk mengubah string menjadi base64
  base64ToString,           # fungsi untuk mengubah base64 menjadi string
  generateCodeRandom,       # fungsi untuk generate code random dengan panjang tertentu sesuai parameter
  getBaseUrl,               # fungsi untuk mendapatkan base url
  replaceTextFromTemplate,  # fungsi untuk mengganti teks pada template (format: {{{key}}})
  successResponse,          # fungsi standarisasi untuk menampilkan response sukses
  errorResponse,            # fungsi standarisasi untuk menampilkan response error
  utcToZone,                # fungsi untuk mengubah waktu UTC ke zona waktu tertentu (misal: Asia/Jakarta)
  zoneToUtc                 # fungsi untuk mengubah waktu zona waktu tertentu (misal: Asia/Jakarta) ke UTC
} from '@mnaufalhamdani/cores-backend/dist';
```