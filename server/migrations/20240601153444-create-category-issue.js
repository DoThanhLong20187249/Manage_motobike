'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryIssues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_issue_name: {
        type: Sequelize.STRING
      },
      category_issue_description: {
        type: Sequelize.STRING
      },
      category_issue_solution: {
        type: Sequelize.STRING
      },
      category_issue_level: {
        type: Sequelize.STRING
      },
      shop_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shops',
          key: 'id'
        }
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
    await queryInterface.dropTable('CategoryIssues');
  }
};