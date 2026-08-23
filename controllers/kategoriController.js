const { Kategori } = require('../models');

exports.getAll = async (req, res) => {
    try {
    const data = await Kategori.findAll();
    res.json({ status: 'success', data });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
    const { nama_kategori } = req.body;
    if (!nama_kategori) {
        return res.status(400).json({ status: 'error', message: 'Nama kategori wajib diisi' });
    }
    const data = await Kategori.create({ nama_kategori });
    res.status(201).json({ status: 'success', message: 'Kategori berhasil dibuat', data });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.update = async (req, res) => {
        try {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
        return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    }
    await kategori.update({ nama_kategori });
    res.json({ status: 'success', message: 'Kategori berhasil diperbarui', data: kategori });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
    const { id } = req.params;
    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
        return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    }
    await kategori.destroy();
    res.json({ status: 'success', message: 'Kategori berhasil dihapus' });
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
    }
};