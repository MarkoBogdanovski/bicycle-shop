const { Product, ProductParts, Category } = require('../../models');
const { transformProductData } = require('../../transformers/productTransformer');

// List products
const listProduct = async (req, res, next) => {
  try {
    // Fetch products with related ProductParts
    const products = await fetchProducts();

    // Transform product data and wait for the transformation to complete
    const transformedData = await transformProductData(products);

    // Send the transformed data in the response
    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

// Fetch Products with Relations
const fetchProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: ProductParts,
          as: 'productParts',
          attributes: ['partsId'],
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    if (products.length > 0) {
      return products;
    } else {
      throw new Error('No products available in stock.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find products.'); // Throwing error instead of using `res` inside the function
  }
};


module.exports = listProduct;
