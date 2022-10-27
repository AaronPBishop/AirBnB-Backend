'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
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
        price: 499.95
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
        price: 850.00
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
        price: 699.99
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
