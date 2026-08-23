const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
    return res.status(401).json({ status: 'error', message: 'Akses ditolak, token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'coffeeshop_secret123');
    req.user = decoded;
    next();
    } catch (error) {
    return res.status(403).json({ status: 'error', message: 'Token tidak valid atau expired' });
    }
};