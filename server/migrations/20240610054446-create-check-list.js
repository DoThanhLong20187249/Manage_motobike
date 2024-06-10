'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CheckLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING
      },
      check_issue_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CheckIssues',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      action_price: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CheckLists');
  }
};