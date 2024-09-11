'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Use UUIDV4 for default value
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      prohibitedCombinations: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      basePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id'] // Create a unique index on the 'id' column
        },
        {
          fields: ['categoryId'] // Create a non-unique index on the 'categoryId' column
        }
      ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
