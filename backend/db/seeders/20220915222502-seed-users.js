'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['FakeUser', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};