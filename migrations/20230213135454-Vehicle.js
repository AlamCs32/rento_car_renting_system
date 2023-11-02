'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('vehicle', 'id', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vehicle', 'owner', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vehicle', 'updatedBy', {
      type: Sequelize.UUID
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('vehicle', 'id', {
      type: Sequelize.UUID,
      autoIncrement: true
    })
    await queryInterface.changeColumn('vehicle', 'owner', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('vehicle', 'updatedBy', {
      type: Sequelize.UUID
    })
  }
};