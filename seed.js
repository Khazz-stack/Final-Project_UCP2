const { sequelize, Kategori, Menu } = require('./models');

const seedDatabase = async () => {
  try {
    // Sinkronisasi ulang database
    await sequelize.sync({ force: true });

    // 1. Buat Kategori Kopi
    const k1 = await Kategori.create({ nama_kategori: 'Espresso Based' });
    const k2 = await Kategori.create({ nama_kategori: 'Non-Coffee' });
    const k3 = await Kategori.create({ nama_kategori: 'Pastry & Snack' });

    const kategoriIds = [k1.id, k2.id, k3.id];
    const dummyMenu = [];

    // 2. Generate 50 Data Menu Dummy
    for (let i = 1; i <= 50; i++) {
      dummyMenu.push({
        nama_menu: `Coffee Shop Item #${i}`,
        harga: (Math.floor(Math.random() * 30) + 15) * 1000, // Harga 15.000 - 45.000
        stok: Math.floor(Math.random() * 50) + 10,
        kategori_id: kategoriIds[i % kategoriIds.length]
      });
    }

    await Menu.bulkCreate(dummyMenu);
    console.log('Berhasil menambahkan 50 data dummy ke database!');
    process.exit();
  } catch (error) {
    console.error('Gagal generate data:', error.message);
    process.exit(1);
  }
};

seedDatabase();