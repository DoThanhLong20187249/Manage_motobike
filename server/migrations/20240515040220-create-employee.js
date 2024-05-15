"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_employee: {
        type: Sequelize.STRING,
      },
      phone_employee: {
        type: Sequelize.STRING,
      },
      address_employee: {
        type: Sequelize.STRING,
      },
      position_employee: {
        type: Sequelize.STRING,
      },
      gender_employee: {
        type: Sequelize.STRING,
      },
      age_employee: {
        type: Sequelize.INTEGER,
      },
      shop_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Shops',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        value: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        value: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
