'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('specification', 'id', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('specification', 'bikeId', {
      type: Sequelize.UUID
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('specification', 'id', {
      type: Sequelize.UUID,
      autoIncrement: true
    })
    await queryInterface.changeColumn('specification', 'bikeId', {
      type: Sequelize.UUID
    })
  }
};
