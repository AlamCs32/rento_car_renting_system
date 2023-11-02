'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('vahiclebooking', 'id', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vahiclebooking', 'userId', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vahiclebooking', 'vehicleId', {
      type: Sequelize.UUID
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('vahiclebooking', 'id', {
      type: Sequelize.UUID,
      autoIncrement: true
    })
    await queryInterface.changeColumn('vahiclebooking', 'userId', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vahiclebooking', 'vehicleId', {
      type: Sequelize.UUID
    })
  }
};
