const { Product, ProductParts, Parts  } = require('../../models');

// Create new product
const newProduct = async (req, res, next) => {
  try {
    const productData = {
      name: req.body.productName,
      basePrice: req.body.productPrice,
      categoryId: '',
      combinations: req.body.combinations
    };

    const { id } = await createProduct(productData);
    const productPartsId = await addProductParts(id, req.body.localSelectedOptions);
    const res = await updateProductPartsColumn(id, productPartsId)

    res.status(201).json({res});
  } catch (error) {
    console.error(req);
    res.status(500).json({ error: 'Unable to add product.' });
  }
};

const createProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * Adds records to the ProductParts table based on selected options.
 * @param {string} productId - The ID of the product to which parts are being added.
 * @param {object} localSelectedOptions - The selected options with parts.
 */
const addProductParts = async(productId, localSelectedOptions) => {
  try {
    // Validate input
    if (!productId || !localSelectedOptions || typeof localSelectedOptions !== 'object') {
      throw new Error('Invalid input');
    }

    // Gather selected parts for the product
    const selectedParts = {};

    for (const [partType, options] of Object.entries(localSelectedOptions)) {
      if (options.length > 0) {
        const partIds = [];

        for (const option of options) {
          const part = await Parts.findOne({ where: { name: option } });
          if (part) {
            partIds.push(part.id);
          } else {
            console.warn(`Part not found: ${option}`);
          }
        }

        if (partIds.length > 0) {
          selectedParts[partType] = partIds;
        }
      }
    }

    // Add record to ProductParts table
    const { id } = await ProductParts.create({
      productId,
      partsId: selectedParts // Store parts as JSON object
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
    const product = await Product.findOne(productId);

    if(product) {
      await product.update({ productPartsId });
      return product;
    } else {
      return { product, message: 'Product not found' };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update product column.' });
  }
};

module.exports = {
  newProduct
}
