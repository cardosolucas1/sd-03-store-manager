const productRouter = require('./routers/productRouter');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Endpoint para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send('');
});

app.use(bodyParser.json());

app.use('/products', productRouter);
// Todas as requisições feitas para '/' em produtos são redirecionadas para esse router

app.listen(3000, () => { console.log('Escutando na porta 3k'); });
