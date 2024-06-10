"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CheckIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckIssue.belongsTo(models.Motocycle, {
        foreignKey: "motocycle_id",
      });
      CheckIssue.belongsTo(models.Employee, {
        foreignKey: "employee_id",
      });
      CheckIssue.belongsTo(models.Shop, {
        foreignKey: "shop_id",
      });
      CheckIssue.belongsTo(models.CategoryIssue, {
        foreignKey: "cateogry_issue_id",
      });
      CheckIssue.hasMany(models.CheckList, {
        foreignKey: "check_issue_id",
      });
      CheckIssue.hasMany(models.Order, {
        foreignKey: "check_issue_id",
      });
    }
  }
  CheckIssue.init(
    {
      motocycle_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      shop_id: DataTypes.INTEGER,
      cateogry_issue_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CheckIssue",
    }
  );
  return CheckIssue;
};
