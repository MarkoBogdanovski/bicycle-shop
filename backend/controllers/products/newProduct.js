const { Product } = require('../../models');

// Create new ticket
const newProduct = async (req, res, next) => {
  try {

    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add product.' });
  }
};

// Create a new product linked to the category
const testCreate = async(req, res, next) => {
  try {
    const response = await Product.create({
      name: 'Custom Bike',
      categoryId: category.id,
      categoryId: '8bb12075-de3a-4004-a6d8-acb8f73391d8',
      prohibitedCombinations: [
        { option1: 'wheels', value1: 'Mountain wheels', option2: 'frameType', value2: 'Diamond' }
      ]
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create test product.' });
  }
}

module.exports = {
  newProduct,
  testCreate
}
