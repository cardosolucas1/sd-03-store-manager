const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', controllers.productsController.productsRegister);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on 3000'));
