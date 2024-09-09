const { Part } = require('../models'); // Import your Part model

const seedParts = async () => {
  try {
    const partsData = [
      { type: 'frameType', name: 'Full-Suspension', price: 50, stock: 100 },
      { type: 'frameType', name: 'Diamond', price: 30, stock: 10 },
      { type: 'frameType', name: 'Step-Throught', price: 45, stock: 45 },
      { type: 'frameFinish', name: 'Matte', price: 30, stock: 100 },
      { type: 'frameFinish', name: 'Shiny', price: 50, stock: 10 },
      { type: 'wheels', name: 'Road', price: 25, stock: 100 },
      { type: 'wheels', name: 'Mountain', price: 75, stock: 75 },
      { type: 'wheels', name: 'Fat Bike', price: 50, stock: 100 },
      { type: 'rimColor', name: 'Red', price: 20, stock: 100 },
      { type: 'rimColor', name: 'Blue', price: 20, stock: 100 },
      { type: 'rimColor', name: 'Black', price: 20, stock: 100 },
      { type: 'chain', name: 'Single speed', price: 15, stock: 50 },
      { type: 'chain', name: '8-speed', price: 45, stock: 50 },
    ];

    // Insert the category data into the Part table
    await Part.bulkCreate(partsData);

    console.log('Part table seeded successfully');
  } catch (error) {
    console.error('Error seeding Part table:', error);
  }
};

seedParts();
