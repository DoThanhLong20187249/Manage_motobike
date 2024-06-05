'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckList.belongsTo(models.CheckIssue, {
        foreignKey: 'check_issue_id',
      });
    }
  }
  CheckList.init({
    action: DataTypes.STRING,
    check_issue_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CheckList',
  });
  return CheckList;
};