'use strict';
const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date();
tomorrow.setHours(24, 0, 0, 0);

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: today,
        endDate: tomorrow
      },
      {
        spotId: 2,
        userId: 2,
        startDate: today,
        endDate: tomorrow
      },
      {
        spotId: 3,
        userId: 3,
        startDate: today,
        endDate: tomorrow
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {}, {});
  }
};
