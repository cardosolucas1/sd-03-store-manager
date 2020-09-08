const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

app.post('/products', productController.addProduct);
app.get('/products', productController.listAllProducts);
app.get('/products/:id', productController.findProduct);
app.put('/products/:id', productController.updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});
