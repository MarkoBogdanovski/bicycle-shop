'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductParts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
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
      partsId: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
    }, {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['productId', 'id'], // Unique constraint on the combination of productId and partId
        },
      ],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductParts');
  }
};
