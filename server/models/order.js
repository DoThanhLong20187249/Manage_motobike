'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Shop, {
        foreignKey: "shop_id",
      });
      Order.belongsTo(models.CheckIssue, {
        foreignKey: "check_issue_id",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
      });
    }
  }
  Order.init({
    shop_id: DataTypes.INTEGER,
    check_issue_id: DataTypes.INTEGER,
    order_total_price: DataTypes.STRING,
    order_code: DataTypes.STRING,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};