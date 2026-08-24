const express = require('express');
const app = express();
const routes = require('./routes/api'); // sesuaikan dengan file route Anda

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend Server is Running!' });
});

// WAJIB UNTUK VERCEL SERVERLESS:
module.exports = app;