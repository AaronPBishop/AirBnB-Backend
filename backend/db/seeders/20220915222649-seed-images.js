'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        spotId: 1,
        reviewId: 1,
        preview: true,
        url: 'http://google.com/images/spot1'
      },
      {
        userId: 2,
        spotId: 2,
        reviewId: 2,
        preview: true,
        url: 'http://google.com/images/spot2'
      },
      {
        userId: 3,
        spotId: 3,
        reviewId: 3,
        preview: true,
        url: 'http://google.com/images/spot3'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {}, {});
  }
};