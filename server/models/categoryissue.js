'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryIssue.belongsTo(models.Shop, {
        foreignKey: 'shop_id'
      })
    }
  }
  CategoryIssue.init({
    category_issue_name: DataTypes.STRING,
    category_issue_description: DataTypes.STRING,
    category_issue_solution: DataTypes.STRING,
    category_issue_level: DataTypes.STRING,
    shop_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryIssue',
  });
  return CategoryIssue;
};