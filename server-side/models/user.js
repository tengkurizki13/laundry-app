"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Request, { foreignKey: "userId" });
      User.hasMany(models.Track, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is Required" },
          notNull: { msg: "Username is Required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email Must Be Unique" },
        validate: {
          notEmpty: { msg: "Email is Required" },
          notNull: { msg: "Email is Required" },
          isEmail: { msg: "Email Wrong Format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is Required" },
          notNull: { msg: "Password is Required" },
          min: {
            args: 5,
            msg: "Minimum Password Length Is 5 Word",
          },
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'customer'),
        defaultValue: "customer",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone Number is Required" },
          notNull: { msg: "Phone Number is Required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Address is Required" },
          notNull: { msg: "Address is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
