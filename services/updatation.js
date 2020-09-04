const { Product } = require('../models/productsModel');

function update(id, qty) {
  return Product.findById(id, (err, doc) => {
    const d = doc;
    if (err) return err;
    d.quantity += qty;
    d.save();
  });
}

async function updater(sale) {
  console.log(sale);
  return sale.forEach(async (p) => {
    await update(p.productId, -p.quantity);
  });
}

async function updaterDelete(sale) {
  return sale.forEach(async (p) => {
    await update(p.productId, +p.quantity);
  });
}

module.exports = {
  updater,
  updaterDelete,
};
