'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopMotocycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShopMotocycle.belongsTo(models.Shop, {foreignKey: 'shop_id'})
      ShopMotocycle.belongsTo(models.Motocycle, {foreignKey: 'motocycle_id'})
    }
  }
  ShopMotocycle.init({
    shop_id: DataTypes.INTEGER,
    motocycle_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShopMotocycle',
  });
  return ShopMotocycle;
};