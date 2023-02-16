'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '4848 Mountain Ridge Rd.',
        city: 'Colorado Springs',
        state: 'Colorado',
        country: 'United States',
        lat: 11.1111,
        lng: 22.2222,
        name: 'Mountain Escape',
        description: 'A beautiful retreat in the mountains of Colorado',
        price: 499.95,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-33039532/original/418b9b58-01e3-4a3a-8641-f99ed5e1b846.jpeg?im_w=1200'
      },
      {
        ownerId: 2,
        address: '9119 Ocean Springs Ave.',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 22.2222,
        lng: 33.3333,
        name: 'Hawaiian Retreat',
        description: 'Breath-taking ocean-side home with gorgeous views',
        price: 850.00,
        previewImage: 'https://a0.muscache.com/im/pictures/6270966e-1534-4382-a4cc-bb230f318ac6.jpg?im_w=1200'
      },
      {
        ownerId: 3,
        address: '2323 Palm Canyon Boulevard',
        city: 'West Palm Beach',
        state: 'Florida',
        country: 'United States',
        lat: 33.3333,
        lng: 44.4444,
        name: 'Palm Beach Villa',
        description: 'A sun-kissed villa with full spa amenities and views of the ocean',
        price: 699.99,
        previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-588976199822506952/original/85cfb14a-9f26-4893-8080-155d02084b52.jpeg?im_w=720'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {}, {});
  }
};
