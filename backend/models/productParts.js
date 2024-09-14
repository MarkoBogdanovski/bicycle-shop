'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductParts extends Model {
    static associate(models) {
      // Association with Product
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  ProductParts.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    partsId: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductParts',
    timestamps: false,
  });

  return ProductParts;
};
