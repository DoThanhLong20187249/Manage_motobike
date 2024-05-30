'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      product_name: {
        type: Sequelize.STRING
      },
      category_product_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'CategoryProducts',
          key: 'id'
        }
      },
      shop_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Shops',
          key: 'id'
        }
      },
      product_price: {
        type: Sequelize.INTEGER
      },
      product_brand: {
        type: Sequelize.STRING
      },
      product_quantity: {
        type: Sequelize.INTEGER
      },
      product_image_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};