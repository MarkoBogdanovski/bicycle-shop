const express = require('express');
const routes = require('./routes/product.js'); // import the routes
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', routes); //to use the routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
