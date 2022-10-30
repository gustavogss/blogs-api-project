'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,       
        primaryKey: true,
       
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,        
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  },
};
