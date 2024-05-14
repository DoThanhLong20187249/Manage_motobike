'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasOne(models.Shop, {
        foreignKey: 'account_id'
      });
      Account.hasOne(models.Employee, {
        foreignKey: 'account_id'
      });
    }
  }
  Account.init({
    email: DataTypes.STRING,
    password_account: DataTypes.STRING,
    role_account: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};