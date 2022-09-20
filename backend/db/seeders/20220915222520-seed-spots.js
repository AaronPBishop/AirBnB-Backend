'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '1234 Spot Lane',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 11.1111,
        lng: 22.2222,
        name: 'Denver Spot',
        description: 'A nice spot',
        price: 99.95,
        previewImage: 'http://google.com/images/spot1'
      },
      {
        ownerId: 2,
        address: '5678 Spot Rd.',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 22.2222,
        lng: 33.3333,
        name: 'Honolulu Spot',
        description: 'A great spot',
        price: 499.99,
        previewImage: 'http://google.com/images/spot2'
      },
      {
        ownerId: 3,
        address: '9101 Spot Drive.',
        city: 'West Palm Beach',
        state: 'Florida',
        country: 'United States',
        lat: 33.3333,
        lng: 44.4444,
        name: 'Florida Spot',
        description: 'A good spot',
        price: 199.99,
        previewImage: 'http://google.com/images/spot3'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
