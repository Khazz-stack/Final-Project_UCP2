const sequelize = require('../config/db');
const User = require('./user');
const Kategori = require('./kategori');
const Menu = require('./menu');

// Asosiasi Model
Kategori.hasMany(Menu, { foreignKey: 'kategori_id', as: 'menu' });
Menu.belongsTo(Kategori, { foreignKey: 'kategori_id', as: 'kategori' });

module.exports = {
  sequelize,
  User,
  Kategori,
  Menu
};