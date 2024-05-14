'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.belongsTo(models.Account, {
        foreignKey: 'account_id'
      });
      Shop.hasMany(models.Employee, {
        foreignKey: 'shop_id'
      });
      Shop.hasMany(models.Customer, {
        foreignKey: 'shop_id'
      });
      Shop.belongsToMany(models.Customer, {
        through: 'ShopGroups',
        foreignKey: 'shop_id'
      
      })
    }
  }
  Shop.init({
    shop_name: DataTypes.STRING,
    hotline: DataTypes.INTEGER,
    shop_address: DataTypes.STRING,
    shop_description: DataTypes.STRING,
    shop_avatar_url: DataTypes.STRING,
    shop_owner_name: DataTypes.STRING,
    account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};