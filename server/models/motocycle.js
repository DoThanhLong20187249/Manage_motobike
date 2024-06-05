'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motocycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Motocycle.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
      })
      Motocycle.hasMany(models.ShopMotocycle, {
        foreignKey: 'motocycle_id',
      })
      Motocycle.hasMany(models.CheckIssue, {
        foreignKey: 'motocycle_id',
      })

    }
  }
  Motocycle.init({
    motocycle_name: DataTypes.STRING,
    motocycle_brand: DataTypes.STRING,
    motocycle_color: DataTypes.STRING,
    motocycle_year: DataTypes.STRING,
    motocycle_number: DataTypes.STRING,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Motocycle',
  });
  return Motocycle;
};