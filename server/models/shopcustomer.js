'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShopCustomer.belongsTo(models.Shop, {
        foreignKey: "shop_id",
      });
      ShopCustomer.belongsTo(models.Customer, {
        foreignKey: "customer_id",
      });

    }
  }
  ShopCustomer.init({
    shop_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShopCustomer',
  });
  return ShopCustomer;
};