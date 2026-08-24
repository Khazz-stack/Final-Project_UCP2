const { Sequelize } = require('sequelize');
const pg = require('pg'); // 1. Import pg secara manual untuk Vercel
require('dotenv').config();

let sequelize;

// Jika menggunakan Cloud DB (seperti Neon/Supabase) via DATABASE_URL
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg, // 2. Beritahu Sequelize memakai modul pg
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Pengaturan Lokal / Variabel Terpisah
  sequelize = new Sequelize(
    process.env.DB_DATABASE || 'coffeeshop_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'nabil2255',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT || 'postgres',
      dialectModule: pg, // 3. Tambahkan di sini juga
      logging: false,
      dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {}
    }
  );
}

module.exports = sequelize;