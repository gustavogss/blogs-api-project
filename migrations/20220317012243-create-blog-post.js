'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,        
        primaryKey: true,
       
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,        
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,        
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,       
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,  
        default: new Date(),           
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false, 
        default: new Date(),     
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};