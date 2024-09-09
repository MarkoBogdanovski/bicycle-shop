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

      // Association with Part
      this.belongsTo(models.Part, {
        foreignKey: 'partId',
        as: 'part',
      });
    }
  }

  ProductParts.init({
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    partId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductParts',
    timestamps: false,
  });

  return ProductParts;
};
