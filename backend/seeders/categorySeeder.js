const { Category } = require('../models'); // Import your Category model

const seedCategory = async () => {
  try {
    const categoryData = [
      { name: 'Bycicles' },
      // Add more categories data as needed
    ];

    // Insert the category data into the Category table
    await Category.bulkCreate(categoryData);

    console.log('Category table seeded successfully');
  } catch (error) {
    console.error('Error seeding Category table:', error);
  }
};

seedCategory();
