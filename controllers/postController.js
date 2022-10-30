const postsServices = require('../services/postServices');

module.exports = {

  async getAllPost(_req, res, next) {
    try {
    const posts = await postsServices.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    next({ status: 500, error });
  }
  },

  async getByIdPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postsServices.getById(id);
      return res.status(200).json(post);
    } catch (error) {
      next({ status: 500, error });
    }
  },

  async getByQueryPost(req, res, next) {
    try {
      const { q } = req.query;
      const { status, data, message } = await postsServices.getByQuery(q);
      if (message) return res.status(status).json({ message });
      res.status(status).json(data);
    } catch (error) {
      next({ status: 500, error });
    }
  },

  async createPost(req, res, next) {
    try {
      const { title, content, categoryIds } = req.body;
      const { id } = req.tokenData;
      const newBlogPost = await postsServices.create({
        title,
        content,
        categoryIds,
        userId: id,
      });
      if (newBlogPost.code) {
        return res.status(newBlogPost.code).json({ message: newBlogPost.message });     
      }
      return res.status(201).json(newBlogPost);
    } catch (error) {
      next({ status: 500, error });
    }
  },

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const { user } = req;
      const updatedPost = await postsServices.update({
        id,
        title,
        content,
        user,
      });
      return res.status(200).json(updatedPost);
    } catch (error) {
      next({ status: 500, error });
    }
  },

  async removePost(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req;
      await postsServices.exclude({ id, user });
      return res.status(204).end();
    } catch (error) {
      next({ status: 500, error });
    }
  },
  
};
