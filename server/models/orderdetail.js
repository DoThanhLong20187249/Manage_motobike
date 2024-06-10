"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Products, {
        foreignKey: "product_id",
      });
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
    }
  }
  OrderDetail.init(
    {
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      price: DataTypes.STRING,
      quantiy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
