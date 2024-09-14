const newProduct = require('./products/newProduct');
const listProduct = require('./products/listProduct');
const { validateCombinations, calculatePrice } = require('./products/productInteractor');
// const deleteProduct = re÷quire('./products/deleteProduct');

module.exports = {
  newProduct,
  listProduct,
  validateCombinations,
  calculatePrice
  // deleteProduct
}
