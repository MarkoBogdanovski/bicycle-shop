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
        otherKey: 'partId',
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
    basePrice: {
      type: DataTypes.FLOAT,
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
