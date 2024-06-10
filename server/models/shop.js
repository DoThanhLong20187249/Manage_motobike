'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.hasMany(models.Employee, {
        foreignKey: "shop_id",
      });
      Shop.hasOne(models.Account, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.ShopCustomer, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.ShopMotocycle, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.Products, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.ShopCategoryProduct, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.CategoryIssue, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.CheckIssue, {
        foreignKey: "shop_id",
      });
      Shop.hasMany(models.Order, {
        foreignKey: "shop_id",
      });
    }
  }
  Shop.init({
    shop_name: DataTypes.STRING,
    hotline: DataTypes.STRING,
    shop_address: DataTypes.STRING,
    shop_description: DataTypes.STRING,
    shop_avatar_url: DataTypes.STRING,
    shop_owner_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};