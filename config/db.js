const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

// Vercel menyuntikkan POSTGRES_URL secara otomatis
const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const sequelize = dbUrl
  ? new Sequelize(dbUrl, {
      dialect: 'postgres',
      dialectModule: pg,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      process.env.DB_DATABASE || 'coffeeshop_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASS || 'nabil2255',
      {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectModule: pg,
        logging: false
      }
    );

module.exports = sequelize;