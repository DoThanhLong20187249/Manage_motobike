'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopMotocycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      motocycle_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Motocycles',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShopMotocycles');
  }
};