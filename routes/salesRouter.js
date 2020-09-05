const { Router } = require('express');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.post('/', salesController.insertSales);
sales.get('/', salesController.getAllSales);
sales.get('/:id', salesController.getSalesById);

module.exports = sales;
