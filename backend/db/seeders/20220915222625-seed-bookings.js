'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date(),
        endDate: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(),
        endDate: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(),
        endDate: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {}, {});
  }
};
