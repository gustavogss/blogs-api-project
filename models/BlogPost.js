const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    type: DataTypes.DATE,
  },
  updated: {
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    Attributes,
    {
      timestamps: true,
      tableName: 'BlogPosts',
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(
      models.User,
    { foreingKey: 'userId', as: 'user' },
    );
  };

  return BlogPost;
};