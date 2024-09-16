const { Part, PartOptionCombination } = require('../../models');

// Create new part
const newPart = async (req, res, next) => {
  try {
    const partData = {
      name: req.body.partName,
      price: req.body.basePrice,
      type: req.body.type,
      stock: true
    };

    const { id } = await createPart(partData);

    const response = await addPartOptionCombinations(id, req.body.combinations);

    res.status(201).json({response});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add part.' });
  }
};

const createPart = async (data) => {
  try {
    return await Part.create(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Adds records to the PartOptionCombination table based on selected options.
 * @param {object} selectedOptions - The selected options with conditions and prices.
 * @param {string} partId - The ID of the part to which combinations are being added.
 */
const addPartOptionCombinations = async (partId, selectedOptions) => {
  try {
    // Validate input
    if (!selectedOptions || !partId) throw new Error('Invalid input');

    const formatPrice = (price) => parseFloat(price.replace(/,/g, ""));

    // Prepare records to insert
    const records = Object.entries(selectedOptions).map(([key, { condition, price }]) => ({
      partId,
      optionId: condition,
      price: formatPrice(price),
    }));

    // Add the combinations to the PartOptionCombination table
    await PartOptionCombination.bulkCreate(records);

    console.log('Part option combinations added successfully');
  } catch (error) {
    console.error('Error adding part option combinations:', error);
  }
};

module.exports = newPart;
