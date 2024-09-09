'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductParts', {
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      partId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Parts', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['productId', 'partId'], // Unique constraint on the combination of productId and partId
        },
      ],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductParts');
  }
};
