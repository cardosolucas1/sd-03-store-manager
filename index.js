// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const productsRouter = require('./controllers/products');

const app = express();

app.get('/', (_req, res) => {
  res.send();
});

app.use(bodyParser.json());

app.use((request, _, next) => {
  console.log(`${request.method} ${request.path}`);
  next();
});

app.use('/products', rescue(productsRouter));
