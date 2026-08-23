const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const kategoriController = require('../controllers/kategoriController');
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

// User / Auth
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);

// Kategori
router.get('/kategori', authMiddleware, kategoriController.getAll);
router.post('/kategori', authMiddleware, kategoriController.create);
router.put('/kategori/:id', authMiddleware, kategoriController.update);
router.delete('/kategori/:id', authMiddleware, kategoriController.delete);

// Menu
router.get('/menu', authMiddleware, menuController.getAll);
router.post('/menu', authMiddleware, menuController.create);
router.put('/menu/:id', authMiddleware, menuController.update);
router.delete('/menu/:id', authMiddleware, menuController.delete);

module.exports = router;