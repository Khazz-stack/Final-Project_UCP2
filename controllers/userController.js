const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nama,
      email,
      password: hashedPassword,
      role: role || 'kasir'
    });

    return res.status(201).json({
      message: 'User berhasil mendaftar',
      user: { id: user.id, nama: user.nama, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    return res.json({ message: 'Login berhasil', token });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

module.exports = {
  register,
  login
};