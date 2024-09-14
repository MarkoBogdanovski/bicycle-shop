const { Part } = require('../models');

/**
 * Transforms the raw database response into a model view format.
 *
 * @param {Array} products - Array of raw product data from the database
 * @returns {Promise<Array>} - Transformed product data suitable for model view
 */

const transformProductData = async (products) => {
  if (!Array.isArray(products) || products.length === 0) throw new Error('Invalid or empty products input');

  // Process products to transform productParts
  const productData = products.map(product => {
    const productParts = product.productParts.map(part => JSON.parse(part.partsId)).flat();
    return {
      name: product.name,
      basePrice: product.basePrice,
      categoryId: product.categoryId,
      productParts,
      prohibitedCombinations: product.prohibitedCombinations
    };
  });

  // Extract all product part IDs from the data
  const allProductPartIds = productData.flatMap(product => product.productParts.map(part => part.id));

  if (allProductPartIds.length === 0) return productData;

  try {
    // Fetch parts based on IDs
    const parts = await Part.findAll({
      where: {
        id: allProductPartIds,
      },
      attributes: ['id', 'name', 'type', 'price', 'stock']
    });

    // Create a map of parts by ID for easy lookup
    const partsMap = parts.reduce((acc, part) => {
      acc[part.dataValues.id] = part.dataValues;
      return acc;
    }, {});


    // Map the parts data onto productParts
    const transformedProductData = productData.map(product => ({
      ...product,
      productParts: product.productParts.map(part => ({
        ...part,
        ...partsMap[part.id], // Merge part data
      })),
    }));


    return transformedProductData;
  } catch (error) {
    console.error('Error transforming product data:', error);
    throw new Error('Unable to transform product data.');
  }
};

module.exports = {
  transformProductData
};
