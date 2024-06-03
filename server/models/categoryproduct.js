"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryProduct.hasMany(models.Products, {
        foreignKey: "category_product_id",
      });
      CategoryProduct.hasMany(models.ShopCategoryProduct, {
        foreignKey: "category_product_id",
      });
    }
  }
  CategoryProduct.init(
    {
      category_name: DataTypes.STRING,
      category_description: DataTypes.STRING,
      category_image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CategoryProduct",
    }
  );
  return CategoryProduct;
};
