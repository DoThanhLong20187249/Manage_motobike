'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password_account: {
        type: Sequelize.STRING
      },
      is_admin: {
        type: Sequelize.BOOLEAN
      },
      shop_id : {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'Shops',
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
    await queryInterface.dropTable('Accounts');
  }
};