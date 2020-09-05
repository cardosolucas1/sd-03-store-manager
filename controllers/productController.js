const rescue = require('express-rescue');
const productService = require('../services/productService');

const getAllProducts = rescue(async (_req, res) => {
  const product = await productService.getAllProducts();
  return res.status(200).json({ products: product });
});

const createProduct = rescue(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  if (product.error === true) {
    return next(product);
  }
  return res.status(201).json(product);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  res.status(200).json(product);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
