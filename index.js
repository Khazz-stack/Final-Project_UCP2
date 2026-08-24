const express = require('express');
const app = express();
const routes = require('./routes/api');

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend Server is Running!' });
});

// BERJALAN DI LOKAL (Hanya dipanggil jika dijalankan lewat 'npm start' / 'node index.js')
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// WAJIB UNTUK VERCEL SERVERLESS:
module.exports = app;