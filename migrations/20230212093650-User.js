'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user', 'id', {
      type: Sequelize.UUID
    })
    await queryInterface.changeColumn('user', 'fine_id', {
      type: Sequelize.UUID
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true
    })
    await queryInterface.changeColumn('user', 'fine_id', {
      type: Sequelize.UUID
    })
  }
};
