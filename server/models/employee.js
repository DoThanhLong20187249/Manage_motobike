'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Shop, {
        foreignKey: 'shop_id'
      });
      Employee.belongsTo(models.Account, {
        foreignKey: 'account_id'
      });
    }
  }
  Employee.init({
    name_employee: DataTypes.STRING,
    phone_employee: DataTypes.INTEGER,
    address_employee: DataTypes.STRING,
    position_employee: DataTypes.STRING,
    gender_employee: DataTypes.STRING,
    age_employee: DataTypes.INTEGER,
    shop_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};