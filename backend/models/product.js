'use strict';
const { Model } = require('sequelize');

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
     * Calculates the total price based on selected options and price dependencies.
     * @param {Object} selectedOptions - User's selected configuration.
     * @returns {number} - The total price of the product.
    */
    async calculatePrice(selectedOptions) {
      if (!Array.isArray(selectedOptions) || selectedOptions.length === 0) {
        throw new Error('Selected options must be a non-empty array.');
      }

      // Fetch only the parts that match the selected options (part IDs)
      const selectedParts = await this.getParts({
        where: {
          id: selectedOptions, // Match the selected part IDs
        },
      });

      // Sum the prices of the selected parts
      const totalPrice = selectedParts.reduce((total, part) => total + part.price, 0);

      return totalPrice;
    }


    /**
     * Validates if the selected configuration has any prohibited combinations.
     * @param {Object} selectedOptions - User's selected configuration.
     * @returns {boolean} - Returns true if the configuration is valid, false otherwise.
   */
    validateCombinations(selectedOptions) {
      // Check if selectedOptions is a valid object
      if (!selectedOptions || typeof selectedOptions !== 'object') {
        throw new Error('Invalid options provided.');
      }

      // Check if prohibitedCombinations is a valid object
      if (!this.prohibitedCombinations || typeof this.prohibitedCombinations !== 'object') {
        return true; // No prohibited combinations, so all are valid
      }

      // Iterate over prohibited combinations
      return !Object.values(this.prohibitedCombinations).some(({ options, condition }) => {
        // Ensure options and condition are defined
        if (!Array.isArray(options) || typeof condition !== 'string') {
          return false; // Skip invalid entries
        }

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
    modelName: 'Product',
    timestamps: true, // Include timestamps if needed
  });

  return Product;
};
