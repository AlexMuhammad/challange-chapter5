'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "Creator"
      });
      this.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "Deletor"
      });
      this.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "Updator"
      });
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id"
      }
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id"
      }
    },
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Car',
    paranoid: true,
  });
  return Car;
};