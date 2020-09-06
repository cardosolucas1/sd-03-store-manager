const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const itensSold = req.body;
  const result = await salesService.addSale(itensSold);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

const getAllSales = rescue(async (req, res) => {
  const results = await salesService.getAllSales();
  if (results.err) return res.status(422).json(results);
  return res.status(200).json(results);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
