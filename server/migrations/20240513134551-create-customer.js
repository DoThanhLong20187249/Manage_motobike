'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_name: {
        type: Sequelize.STRING
      },
      customer_phone: {
        type: Sequelize.INTEGER
      },
      customer_address: {
        type: Sequelize.STRING
      },
      customer_gender: {
        type: Sequelize.STRING
      },
      customer_age: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};