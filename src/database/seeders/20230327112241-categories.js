'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {  
    
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name : "Cocina",
          imagen : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Panaderia",
          imagen : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Pasteleria",
          imagen : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Otros",
          imagen : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
      ],
      {}
    );
    
  },

  async down (queryInterface, Sequelize) {  
   await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
