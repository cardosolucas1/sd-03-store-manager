const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerSales = async (products) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold: [...products] }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...products] }));

const getSales = async () => connect()
  .then((db) => db.collection('sales')
    .find({})
    .toArray());

const getSalesById = async (id) => connect()
  .then((db) => db.collection('sales')
    .findOne(ObjectId(id)));

const updateSalesInBank = async (id, products) => connect()
  .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: products } }))
  .then(({ insertedId }) => ({ insertedId, itensSold: products }));

module.exports = {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
};
