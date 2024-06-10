'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
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
      check_issue_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CheckIssues',
          key: 'id'
        }
      },
      order_total_price: {
        type: Sequelize.STRING
      },
      order_code: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Orders');
  }
};