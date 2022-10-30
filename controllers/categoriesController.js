const categoryServices = require('../services/categoriesServices');

module.exports = {
  async getAllCategories(req, res, next) {
    try {      
      const categories = await categoryServices.getAll(req.body);
      return res.status(200).json(categories);
    } catch (error) {
      next({ status: 500, error });
    }
  },

  async createCategories(req, res, next) {
    try {    
      const category = await categoryServices.create(req.body);
      return res.status(category.status).json(category.message);      
    } catch (error) {
      next({ status: 500, error });
    }
  },
};
