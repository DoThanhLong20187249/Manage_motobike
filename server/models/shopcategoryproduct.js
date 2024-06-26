'use strict';
const {
  Model
} = require('sequelize');
const shop = require('./shop');
module.exports = (sequelize, DataTypes) => {
  class ShopCategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShopCategoryProduct.belongsTo(models.Shop, {
        foreignKey: 'shop_id'
      });
      ShopCategoryProduct.belongsTo(models.CategoryProduct, {
        foreignKey: 'category_product_id'
      });
    }
  }
  ShopCategoryProduct.init({
    shop_id: DataTypes.INTEGER,
    category_product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShopCategoryProduct',
  });
  return ShopCategoryProduct;
};