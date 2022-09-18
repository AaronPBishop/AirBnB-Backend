'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'FakeUser',
        firstName: 'Ronnie',
        lastName: 'Coleman',
        email: 'user@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'FakeUser2',
        firstName: 'Johnny',
        lastName: 'Depp',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'FakeUser3',
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
        email: 'user3@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['FakeUser', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};