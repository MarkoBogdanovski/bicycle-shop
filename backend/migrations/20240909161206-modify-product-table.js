'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'productPartsId', {
      type: Sequelize.UUID,
      allowNull: true, // Or set to false if the column should be required
    });

    // Optionally, you can add an index on the new column
    await queryInterface.addIndex('Products', ['productPartsId'], {
      name: 'products_productPartsId_idx',
      unique: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the index before dropping the column
    await queryInterface.removeIndex('Products', 'products_productPartsId_idx');

    // Drop the new column
    await queryInterface.removeColumn('Products', 'productPartsId');
  }
};
