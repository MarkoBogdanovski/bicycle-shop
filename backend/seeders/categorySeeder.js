const { Category } = require('../models'); // Import your Category model

const seedCategory = async () => {
  try {
    const categoryData = [
      { id: "8cfd81f4-0a99-4baf-afbc-e7a6f37748d4", name: 'Bycicles' },
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
