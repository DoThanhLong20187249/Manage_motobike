'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motocycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motocycle_name: {
        type: Sequelize.STRING
      },
      motocycle_brand: {
        type: Sequelize.STRING
      },
      motocycle_color: {
        type: Sequelize.STRING
      },
      motocycle_year: {
        type: Sequelize.STRING
      },
      motocycle_number: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue:new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue:new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Motocycles');
  }
};