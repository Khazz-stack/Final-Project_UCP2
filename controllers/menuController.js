const { Menu, Kategori } = require('../models');

exports.getAll = async (req, res) => {
    try {
    const data = await Menu.findAll({
        include: [{ model: Kategori, as: 'kategori', attributes: ['id', 'nama_kategori'] }]
    });
    res.json({ status: 'success', data });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
    const { nama_menu, harga, stok, kategori_id } = req.body;
    if (!nama_menu || !harga || !kategori_id) {
        return res.status(400).json({ status: 'error', message: 'Nama menu, harga, dan kategori_id wajib diisi' });
    }
    const data = await Menu.create({ nama_menu, harga, stok: stok || 0, kategori_id });
    res.status(201).json({ status: 'success', message: 'Menu berhasil ditambahkan', data });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
        return res.status(404).json({ status: 'error', message: 'Menu tidak ditemukan' });
    }
    await menu.update(req.body);
    res.json({ status: 'success', message: 'Menu berhasil diperbarui', data: menu });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
        return res.status(404).json({ status: 'error', message: 'Menu tidak ditemukan' });
    }
    await menu.destroy();
    res.json({ status: 'success', message: 'Menu berhasil dihapus' });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};