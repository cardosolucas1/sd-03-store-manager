require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const Boom = require('@hapi/boom');
const { productsRouter, sales } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', sales);

app.all(/.*/, (req, res) => res.json({ message: `${req.path} não encontrado` }));

function threatBoomErr({ payload }) {
  const { message, error } = payload;
  const code = error === 'Unprocessable Entity' ? 'invalid_data' : error;
  return { err: { code, message } };
}

app.use((err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    console.error(
`message, ${err.output.message}
error -> code, ${err.output.error}`
    );
    return res
    .status(err.output.statusCode)
    .json(threatBoomErr(err.output));
  }
  return res.json({ status: 500, message: err.message, data: err.stack });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
