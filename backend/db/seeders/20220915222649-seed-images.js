'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        spotId: 1,
        reviewId: null,
        preview: false,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33039532/original/418b9b58-01e3-4a3a-8641-f99ed5e1b846.jpeg?im_w=1200'
      },
      {
        userId: 2,
        spotId: 2,
        reviewId: null,
        preview: false,
        url: 'https://a0.muscache.com/im/pictures/6270966e-1534-4382-a4cc-bb230f318ac6.jpg?im_w=1200'
      },
      {
        userId: 3,
        spotId: 3,
        reviewId: null,
        preview: false,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-588976199822506952/original/85cfb14a-9f26-4893-8080-155d02084b52.jpeg?im_w=720'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {}, {});
  }
};