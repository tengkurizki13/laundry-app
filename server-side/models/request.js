"use strict";
const { Model } = require("sequelize");
// const { Ingredient } = require("../models");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, { foreignKey: "userId" });
      Request.hasMany(models.Track, { foreignKey: "requestId" });
    }

  }
  Request.init(
    {
      item: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Item is Required" },
          notNull: { msg: "Item is Required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price is Required" },
          notNull: { msg: "Price is Required" },
        },
      },
      scale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Scale is Required" },
          notNull: { msg: "Scale is Required" },
        },
      },
      status: {
        type: DataTypes.ENUM('proses','penimbangan','pencucian','pengeringan','pengemasan','selesai'),
        defaultValue: "proses",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId is Required" },
          notNull: { msg: "UserId is Required" },
        },
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
