'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AccountEmployees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_employee: {
        type: Sequelize.STRING
      },
      password_employee: {
        type: Sequelize.STRING
      },
      role_account: {
        type: Sequelize.STRING
      },
      employee_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'Employees',
          key: 'id'
        }
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
    await queryInterface.dropTable('AccountEmployees');
  }
};