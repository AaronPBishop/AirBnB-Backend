'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 2,
        review: 'Visit was alright',
        stars: 3
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Visit was great',
        stars: 5
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Visit was good',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {}, {});
  }
};
