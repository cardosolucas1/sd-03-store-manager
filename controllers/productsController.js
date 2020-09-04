const Products = require('../models/productsModel');
const Validation = require('../services/validations');

async function promise1(res, prod, req, status1, status2) {
  try {
    const product = await prod(req);
    res.status(status1).send(product);
  } catch (error) {
    res.status(status2).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}

async function promise2(req, res, dest, prod) {
  try {
    let id;
    if (req.params) {
      id = req.params.id;
    }
    const { name, quantity } = req.body;
    const { message } = await dest(name, quantity);
    if (message) {
      throw new Error(message);
    }
    if (id) {
      const product = await prod(id, { name, quantity });
      res.status(200).send(product);
    } else {
      const product = await prod({ name, quantity });
      res.status(201).send(product);
    }
  } catch (error) {
    const err = {
      err: {
        code: 'invalid_data', message: error.message,
      },
    };
    res.status(422).send(err);
  }
}

async function productController(req, res) {
  await promise2(req, res, Validation.validateNewProduct, Products.createProduct);
}

async function listProducts(req, res) {
  try {
    const products = await Products.listProducts();
    res.status(200).send({ products });
  } catch (error) {
    res.status(404).send([]);
  }
}

async function getProduct(req, res) {
  await promise1(res, Products.getProductById, req.params.id, 200, 422);
}

async function updateProduct(req, res) {
  await promise2(req, res, Validation.validateUpdateProduct, Products.updateProduct);
}

async function deleteProduct(req, res) {
  await promise1(res, Products.deleteProduct, req.params.id, 200, 422);
}

module.exports = {
  productController,
  deleteProduct,
  listProducts,
  getProduct,
  updateProduct,
};
