const newProduct = require('./products/newProduct');
const listProduct = require('./products/listProduct');
const { validateCombinations, calculatePrice } = require('./products/productInteractor');

module.exports = {
  newProduct,
  listProduct,
  validateCombinations,
  calculatePrice
}
