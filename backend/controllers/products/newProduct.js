const { Product, ProductParts, Part } = require('../../models');

// Create new product
const newProduct = async (req, res, next) => {
  try {
    const productData = {
      name: req.body.productName,
      basePrice: req.body.productPrice,
      categoryId: req.body.categoryId,
      prohibitedCombinations: req.body.combinations
    };

    const { id } = await createProduct(productData);
    const productPartsId = await addProductParts(id, req.body.options);
    const response = await updateProductPartsColumn(id, productPartsId)

    res.status(201).json({response});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add product.' });
  }
};

const createProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Adds records to the ProductParts table based on selected options.
 * @param {string} productId - The ID of the product to which parts are being added.
 * @param {object} localSelectedOptions - The selected options with parts.
 */
  const addProductParts = async(productId, partIds) => {
    try {
      // Validate input
      // if (!productId || !partIds) throw new Error('Invalid input');

      // Fetch all parts to make sure they exist
      // const parts = await Part.findAll({
      //   where: { id: partIds },
      //   attributes: ['id'],
      // });

      // if (parts.length !== partIds.length) throw new Error('Some parts do not exist');

      // Add the parts to the ProductParts table
      const { id } =  await ProductParts.create({
        productId,
        partsIds: partIds, // partIds is an array of part UUIDs
      });

      console.log('Product parts added successfully');
      return id;
    } catch (error) {
      console.error('Error adding product parts:', error);
    }
}


// Update product parts column
const updateProductPartsColumn = async (productId, productPartsId) => {
  try {
    const product = await Product.findByPk(productId);

    if(product) {
      await product.update({ productPartsId });
      return product;
    } else {
      return { product, message: 'Product not found' };
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  newProduct
}
