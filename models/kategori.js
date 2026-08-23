const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Kategori = sequelize.define('Kategori', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_kategori: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'kategori',
  timestamps: true
});

module.exports = Kategori;