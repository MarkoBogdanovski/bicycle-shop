const { Part } = require('../../models');

const listParts = async (req, res, next) => {
  try {
    const parts = await fetchParts();

    res.status(201).json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

// Feth Parts
const fetchParts = async () => {
  try {
    const parts = await Part.findAll({
      attributes: ['id', 'name', 'type', 'price', 'stock']
    });

    if (!parts) return { part, message: 'No parts available in stock.' };

    return parts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = listParts;
