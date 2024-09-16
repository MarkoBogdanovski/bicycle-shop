'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });

      this.hasMany(models.ProductParts, {
        foreignKey: 'productId',
        as: 'productParts'
      });
    }

    /**
     * Calculates the total price based on selected parts and price dependencies.
     * @param {Array} selectedParts - Array of selected part IDs.
     * @returns {number} - The total price of the product.
     */
    async calculatePrice(partIds) {
      // Filter out any empty strings or invalid entries from the selectedOptions array
      const validParts = partIds.filter(partId => partId && typeof partId === 'string');
      // If no valid parts are selected, return the product's base price
      if (validParts.length === 0) return this.basePrice;

      // Check for a valid part combination
      const combination = await sequelize.models.PartOptionCombination.findOne({
        where: {
          partId: {
            [Op.in]: validParts,
          },
          optionId: {
            [Op.in]: validParts,
          }
        }
      });

      let combinationPrice = 0;
      let remainingParts = validParts;

      if (combination) {
        combinationPrice = combination.price;
        remainingParts = validParts.filter(partId => partId !== combination.partId && partId !== combination.optionId); // Exclude the combination parts from remaining parts
      }

      // Calculate the total price of the remaining parts
      const parts = await sequelize.models.Part.findAll({
        where: {
          id: remainingParts,
        },
      });

      if (parts.length !== remainingParts.length) throw new Error('One or more selected parts are not found.');

      const remainingPartsPrice = parts.reduce((total, part) => total + part.price, 0);

      // Return the sum of the base price, combination price, and remaining parts' prices
      return this.basePrice + combinationPrice + remainingPartsPrice;
    }

    /**
     * Validates if the selected configuration has any prohibited combinations.
     * @param {Object} selectedOptions - User's selected configuration.
     * @returns {boolean} - Returns true if the configuration is valid, false otherwise.
   */
    validateCombinations(selectedOptions) {
      // Check if selectedOptions is a valid object
      if (!selectedOptions || typeof selectedOptions !== 'object') throw new Error('Invalid options provided.');

      // Check if prohibitedCombinations is a valid object
      if (!this.prohibitedCombinations || typeof this.prohibitedCombinations !== 'object') return true; // No combinations

      // Iterate over prohibited combinations
      return !Object.values(this.prohibitedCombinations).some(({ options, condition }) => {
        // Ensure options and condition are defined
        if (!Array.isArray(options) || typeof condition !== 'string') return false; // Skip invalid entries

        // Check if the condition is met in the selected options
        const conditionMet = Object.values(selectedOptions).includes(condition);

        // Check if any of the options are selected
        const optionsIncluded = options.some(optionId => Object.values(selectedOptions).includes(optionId));

        // If condition is met and any of the options are selected, the combination is prohibited
        return conditionMet && optionsIncluded;
      });
    }
  }

  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productPartsId: {
      type: DataTypes.UUID,
      allowNull: true, // No foreign key constraint
    },
    prohibitedCombinations: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: true, // Include timestamps if needed
  });

  return Product;
};
