'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product, {
        through: 'ProductParts',
        as: 'products',
        foreignKey: 'partId',
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
      allowNull: false
    },
    type: {
      type: DataTypes.STRING, // e.g., 'frameType', 'wheels', 'chain', etc.
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT, // Price of the part
      allowNull: false,
    },
    stock: {
      type: DataTypes.BOOLEAN, // Quantity in stock
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Part',
    timestamps: true
  });

  return Part;
};
