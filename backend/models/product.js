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
      this.belongsTo(models.Product, {
        foreignKey: 'categoryId',
        as: 'category',
      });

      // New association with Product Parts
      this.belongsToMany(models.ProductParts, {
        through: 'ProductParts',
        as: 'parts',
        foreignKey: 'productId',
      });
    }

    /**
     * Calculates the total price based on selected options and price dependencies.
     * @param {Object} selectedOptions - User's selected configuration.
     * @returns {number} - The total price of the product.
    */
    calculatePrice(selectedOptions) {
      let totalPrice = 0;

      // Validate selected options
      if (!selectedOptions || typeof selectedOptions !== 'object') {
        throw new Error('Invalid options provided.');
      }

      // Calculate base prices for each selected option
      for (const [option, selectedValue] of Object.entries(selectedOptions)) {
        if (this.prices[option] && this.prices[option][selectedValue]) {
          totalPrice += this.prices[option][selectedValue];
        }
      }

      // Handle frame and finish dependencies
      const frameType = selectedOptions.frameType;
      if (frameType && this.prices.frameFinishDependency && this.prices.frameFinishDependency[frameType]) {
        totalPrice += this.prices.frameFinishDependency[frameType];
      }

      return totalPrice;
    }

    /**
     * Validates if the selected configuration has any prohibited combinations.
     * @param {Object} selectedOptions - User's selected configuration.
     * @returns {boolean} - Returns true if the configuration is valid, false otherwise.
   */
    validateCombinations(selectedOptions) {
      if (!selectedOptions || typeof selectedOptions !== 'object') {
        throw new Error('Invalid options provided.');
      }

      if (!this.prohibitedCombinations || !Array.isArray(this.prohibitedCombinations)) {
        return true;
      }

      return !this.prohibitedCombinations.some(({ option1, value1, option2, value2 }) =>
        selectedOptions[option1] === value1 && selectedOptions[option2] === value2
      );
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
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    prices: {
      type: DataTypes.JSONB,
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
