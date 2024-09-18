const { Part } = require('../models'); // Import your Part model

const seedParts = async () => {
  try {
    const partsData = [
      { type: 'frameType', name: 'Full-Suspension', price: 50, stock: true },
      { type: 'frameType', name: 'Diamond', price: 30,  stock: true },
      { type: 'frameType', name: 'Step-Throught', price: 45,  stock: true },
      { type: 'frameFinish', name: 'Matte', price: 30, stock: true },
      { type: 'frameFinish', name: 'Shiny', price: 50, stock: true },
      { type: 'wheels', name: 'Road', price: 25, stock: true },
      { type: 'wheels', name: 'Mountain', price: 75, stock: true },
      { type: 'wheels', name: 'Fat Bike', price: 50, stock: false },
      { type: 'rimColor', name: 'Red', price: 20, stock: false },
      { type: 'rimColor', name: 'Blue', price: 20, stock: true },
      { type: 'rimColor', name: 'Black', price: 20, stock: true },
      { type: 'chain', name: 'Single speed', price: 15, stock: true },
      { type: 'chain', name: '8-speed', price: 45, stock: true },
    ];

    // Insert the category data into the Part table
    await Part.bulkCreate(partsData);

    console.log('Part table seeded successfully');
  } catch (error) {
    console.error('Error seeding Part table:', error);
  }
};

seedParts();
