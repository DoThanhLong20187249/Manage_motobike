'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('ShopGroups', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date()
    });
    await queryInterface.changeColumn('ShopGroups', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date()
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


    await queryInterface.changeColumn('ShopGroups', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('ShopGroups', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
