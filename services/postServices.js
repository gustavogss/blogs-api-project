const { Op } = require('sequelize');
const { User, BlogPost, Category, PostCategory } = require('../models');

module.exports = {

  async getAll() {   
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });   
    return posts;  
  },  

  async getById({ id }) {   
      const post = await BlogPost.findByPk(id, {
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      if (!post) return { code: 401, message: 'Post does not exist' }; 
      return { code: 200, post };   
  },  

  async create({ title, content, categoryIds, userId }) {
    console.log(title, content, categoryIds, userId);
      const categories = await Category.findAll();
      const category = categories.map(({ id }) => id);
      const isCategoryExist = categoryIds.every((id) => category.includes(id));

    if (!isCategoryExist) {
 return { code: 400, message: '"categoryIds" not found' };
    }

    const post = await BlogPost.create({ title, content, userId });
    await 
    Promise.all(categoryIds.map((id) => PostCategory.create({ postId: post.id, categoryId: id }))); 
    return { id: post.id, title, content, userId }; 
  },
 // https://stackoverflow.com/questions/20695062/sequelize-or-condition-object
  async getByQuery(query) {
    const posts = await BlogPost.findAll({    
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  
    const postSelected = posts.filter((post) => [post].includes(query));    
    return { status: 200, postSelected };   
  },

  async update({ id, title, content, user = { email: '' } }) {
    const post = await BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['id', 'published', 'updated'] },
      include: { model: Category, as: 'categories', through: { attributes: [] } },
    });

      if (!post) return { code: 404, message: 'Post does not exist' };
      
      const author = post.dataValues.user.email === user.email;
      if (!author) { return { code: 401, message: 'Unauthorized user' }; }
      
      return { 
        code: 200, 
        post, 
        title,
        content,       
        categories: post.dataValues.categories };  
  },

  async remove(id, userId) {
      const post = await BlogPost.findByPk(id);
      if (!post) return { code: 404, message: 'Post does not exist' };    
      if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };      
      await post.destroy();
      return { code: 204 };
  },
  
};