'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('payment', 'id', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('payment', 'userId', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('payment', 'order_id', {
      type: Sequelize.UUID
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('payment', 'id', {
      type: Sequelize.UUID,
      autoIncrement: true
    })
    await queryInterface.changeColumn('payment', 'userId', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('payment', 'order_id', {
      type: Sequelize.UUID
    })
  }
};
