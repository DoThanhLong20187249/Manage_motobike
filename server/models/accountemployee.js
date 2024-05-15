'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccountEmployee.belongsTo(models.Employee, {
        foreignKey: "employee_id",
      });
    }
  }
  AccountEmployee.init({
    email_employee: DataTypes.STRING,
    password_employee: DataTypes.STRING,
    role_account: DataTypes.STRING,
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccountEmployee',
  });
  return AccountEmployee;
};