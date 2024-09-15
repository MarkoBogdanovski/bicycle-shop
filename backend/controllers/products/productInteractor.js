const { Product } = require('../../models');

const validateCombinations = async (req, res, next) => {
  const { productId } = req.params;
  const { selectedOptions } = req.body;

  try {
    const product = await Product.findByPk(productId);
    const isValid = product.validateCombinations(selectedOptions);
    res.json({ isValid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculatePrice = async (req, res, next) => {
  const { productId } = req.params;
  const partsIds = Object.values(req.body).map(id => id);

  try {
    const product = await Product.findByPk(productId);
    const totalPrice = await product.calculatePrice(partsIds);

    res.json({ totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validateCombinations,
  calculatePrice
}
