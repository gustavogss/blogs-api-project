const userServices = require('../services/userServices');

module.exports = {

  async getAllUser(_req, res, next) {    
  try {
    const users = await userServices.getAll();
    return res.status(200).json(users);    
  } catch (error) {
    next({ status: 500, error });
   }  
  },

  async getByIdUser(req, res, next) {    
    try {
      const { id } = req.params;
      const user = await userServices.getById(id);
      if (!user) return res.status(404).json({ message: 'User does not exist' });  
      return res.status(200).json(user);     
    } catch (error) {
      next({ status: 500, error });
     }  
    },

  async createUser(req, res, next) {
    try {
      const { code, token, message } = await userServices.create(req.body);
      if (message) return res.status(code).json({ message });
      return res.status(code).json({ token });
    } catch (error) {
      next({ status: 500, error });
    }
  }, 

  async removeUser(req, res, next) {
    try {
      const { id } = req.params;
      await userServices.remove(id); 
      return res.status(200).end();
    } catch (error) {
      next({ status: 500, error });
    }
  },

};
