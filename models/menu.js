const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_menu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stok: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'menu',
  timestamps: true
});

module.exports = Menu;