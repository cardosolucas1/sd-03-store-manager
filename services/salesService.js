const sales = require('../models/sales');
const { invaliddataError, notFound } = require('../errors');

const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);
const checkNumberTwo = (el) => /^[0-9]+$/.test(el);

const insertSales = async (saleInsert) => {
  const checkId = saleInsert.map((el) => !checkForHexRegExp(el.productId));
  const checkNumber = saleInsert.map((el) => el.quantity);
  if (checkId.some((el) => el === true) || checkNumber.some((el) => el <= 0)
  || checkNumber.some((el) => !checkNumberTwo(el))) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  const t = await sales.insertSales(saleInsert);
  return t;
};

const getAllSales = async () => {
  const allSales = await sales.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const allSales = await sales.getSalesById(id);
  if (!allSales) {
    return notFound('Sale not found');
  }
  return allSales;
};

const updateSales = async (id, values) => {
  const trueValues = values.map((el) => el.quantity);
  if (trueValues.some((el) => el <= 0)
  || trueValues.some((el) => !checkNumberTwo(el))) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  const allSales = await sales.updateSales(id, values);
  return allSales;
};

const deleteSales = async (id) => {
  if (!checkForHexRegExp(id)) {
    return invaliddataError('Wrong sale ID format');
  }
  const sale = await sales.getSalesById(id);
  if (!sale) {
    return notFound('Sale not found');
  }
  await sales.deleteSales(id);
  return sale;
};

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};
