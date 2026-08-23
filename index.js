require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRoutes);

console.log('Memulai aplikasi & mencoba konek ke database...');

// Cek koneksi & sync database
sequelize.authenticate()
    .then(() => {
    console.log('Koneksi ke PostgreSQL berhasil!');
    return sequelize.sync({ alter: true });
    })
    .then(() => {
    console.log('Database synced!');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
    console.error('Gagal konek ke database:', err.message);
    });