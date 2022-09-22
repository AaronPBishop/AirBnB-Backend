'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('January 1, 2023 00:00:00'),
        endDate: new Date('January 4, 2023 00:00:00')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('January 12, 2023 00:00:00'),
        endDate: new Date('January 16, 2023 00:00:00')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('February 8, 2023 00:00:00'),
        endDate: new Date('February 14, 2023 00:00:00')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {}, {});
  }
};
