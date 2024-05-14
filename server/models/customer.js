'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Shop, {
        through: 'ShopGroups',
        foreignKey: 'customer_id'
      });
    }
  }
  Customer.init({
    customer_name: DataTypes.STRING,
    customer_phone: DataTypes.INTEGER,
    customer_address: DataTypes.STRING,
    customer_gender: DataTypes.STRING,
    customer_age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};