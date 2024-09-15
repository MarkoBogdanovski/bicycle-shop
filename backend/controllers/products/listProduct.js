const { Product, ProductParts, Category } = require('../../models');
const { transformProductData } = require('../../transformers/productTransformer');

// List products
const listProduct = async (req, res, next) => {
  try {
    // Fetch products with related ProductParts
    const products = await fetchProducts();

    if (products.length === 0) {
      // Return a 404 response if no products are found
      return res.status(200).json({ products: [], error: 'No products available in stock.' });
    }

    // Transform product data and wait for the transformation to complete
    const transformedData = await transformProductData(products);

    // Send the transformed data in the response
    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

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

    // Return the products, even if it's an empty array
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to find products.'); // Throwing error instead of using `res` inside the function
  }
}

module.exports = listProduct;
