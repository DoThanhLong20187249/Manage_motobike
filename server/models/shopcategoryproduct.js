'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopCategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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