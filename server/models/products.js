'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.CategoryProduct, {
        foreignKey: "category_product_id"
      })
      Products.belongsTo(models.Shop, {
        foreignKey: "shop_id"
      })
    }
  }
  Products.init({
    code: DataTypes.STRING,
    product_name: DataTypes.STRING,
    category_product_id: DataTypes.INTEGER,
    shop_id: DataTypes.INTEGER,
    product_price: DataTypes.INTEGER,
    product_brand: DataTypes.STRING,
    product_quantity: DataTypes.INTEGER,
    product_image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};