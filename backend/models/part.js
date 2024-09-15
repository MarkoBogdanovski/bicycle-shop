'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    static associate(models) {
      // Define the many-to-many relationship between Part and ProductParts
      this.belongsToMany(models.Product, {
        through: 'productParts',
        foreignKey: 'partsId',
        as: 'products'
      });
    }
  }

  Part.init({
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
    type: {
      type: DataTypes.STRING, // e.g., 'frameType', 'wheels', 'chain', etc.
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER, // Price of the part
      allowNull: false,
    },
    stock: {
      type: DataTypes.BOOLEAN, // Quantity in stock
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'parts',
    modelName: 'Part',
    timestamps: true,
  });

  return Part;
};
