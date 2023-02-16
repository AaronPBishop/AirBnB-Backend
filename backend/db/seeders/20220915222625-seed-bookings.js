'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, {}, {});
  }
};
