'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Todos', 'nama', 'name')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Todos', 'nama', 'name')
  }
};
