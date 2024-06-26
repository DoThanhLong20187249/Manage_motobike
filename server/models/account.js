'use strict';
const {
  Model
} = require('sequelize');
const shop = require('./shop');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Shop, {
        foreignKey: "shop_id",
      });
    }
  }
  Account.init({
    email: DataTypes.STRING,
    password_account: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    shop_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};