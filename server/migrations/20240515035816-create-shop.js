'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_name: {
        type: Sequelize.STRING
      },
      hotline: {
        type: Sequelize.STRING
      },
      shop_address: {
        type: Sequelize.STRING
      },
      shop_description: {
        type: Sequelize.STRING
      },
      shop_avatar_url: {
        type: Sequelize.STRING
      },
      shop_owner_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        value: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        value: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shops');
  }
};