'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PartOptionCombination extends Model {
    static associate(models) {
      // Define the relationship between PartOptionCombination and Part
    }
  }

  PartOptionCombination.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    partId: {
      type: DataTypes.UUID,
      allowNull: false, // Reference to the main part
    },
    optionId: {
      type: DataTypes.UUID,
      allowNull: false, // Reference to the option part
    },
    price: {
      type: DataTypes.INTEGER, // Special price for this combination of parts
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PartOptionCombination',
    timestamps: true,
  });

  return PartOptionCombination;
};
