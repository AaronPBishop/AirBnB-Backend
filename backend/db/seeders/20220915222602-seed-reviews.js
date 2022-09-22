'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
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
    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
