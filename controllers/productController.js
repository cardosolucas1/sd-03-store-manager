const rescue = require('express-rescue');
const { Router } = require('express');
const { productValidate, idValidate } = require('../middlewares/productValidate');
const productServices = require('../services/productServices');

const product = Router();

product
  .post('/', productValidate, rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const response = await productServices.handleCreateProduct(name, quantity);
    return response.error ? res.status(422).json(response.message) : res.status(201).json(response);
  }))
  .get('/', rescue(async (_req, res) => {
    const response = await productServices.handleGetAllProducts();
    return res.status(200).json({ products: response });
  }))
  .get('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const productById = await productServices.handleGetProductById(id);
    return productById.error
      ? res.status(422).json(productById.message) : res.status(200).json(productById);
  }))
  .put('/:id', idValidate, productValidate, rescue(async (req, res) => {
    const productData = req.body;
    const { id } = req.params;
    const updatedProduct = await productServices.handleUpdateProduct(id, productData);
    return updatedProduct.error
      ? res.status(502).json(updatedProduct.message) : res.status(200).json(updatedProduct);
  }))
  .delete('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productServices.handleDeleteProduct(id);
    return deletedProduct.error
      ? res.status(422).json(deletedProduct.message) : res.status(200).json(deletedProduct);
  }));

module.exports = product;
