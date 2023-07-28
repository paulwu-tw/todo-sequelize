'use strict';

const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '1111'
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});


    await queryInterface.bulkInsert('Todos',
      Array.from({ length: 10 }).map((_, i) =>
      ({
        name: `name-${i}`,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      ), {})

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
    queryInterface.bulkDelete('Users', null, {})
  }
};
