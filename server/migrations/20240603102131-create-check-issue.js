'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CheckIssues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motocycle_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Motocycles",
          key:"id"
        }
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Employees",
          key:"id"
        }
      },
      shop_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Shops",
          key:"id"
        }
      },
      cateogry_issue_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"CategoryIssues",
          key:"id"
        }
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CheckIssues');
  }
};