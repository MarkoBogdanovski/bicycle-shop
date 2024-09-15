'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PartOptionCombination', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      partId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Part', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      optionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Part', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: {
        type: Sequelize.integer,
        allowNull: false,
      },
    }, {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['partId', 'optionId', 'id'], // Unique constraint on the combination of productId and partId
        },
      ],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PartOptionCombination');
  }
};
