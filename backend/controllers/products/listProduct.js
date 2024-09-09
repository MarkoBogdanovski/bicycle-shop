const { Product } = require('../../models');

// List products
const listProduct = async (req, res, next) => {
  try {
    const response = await fetchProducts(req.body);

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

// Feth Products
const fetchProducts = async () => {
  try {
    const products = await Product.findAll({
      where: { isAvailable: true },
    });

    if (products) {
      return products;
    } else {
      return { ticket, message: 'No products available in stock.' };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to find products.' });
  }
};

module.exports = listProduct;
