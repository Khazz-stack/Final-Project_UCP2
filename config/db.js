const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'coffeeshop_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'nabil2255',
    {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false
    }
);

module.exports = sequelize;