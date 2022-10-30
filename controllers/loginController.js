require('dotenv').config();
const jwt = require('jsonwebtoken');

// const userServices = require('../services/userServices');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = {
  
  async loginUser(req, res, next) {
    try {
     const { body: user } = req;

    // const checkEmail = await userServices.getByEmail(user.email);
    // if (!checkEmail) return res.status(400).json({ message: 'Invalid fields' });
  
    const newUser = await User.findOne({ where: { email: user.email, password: user.password } });
    if (!newUser) return res.status(400).json({ message: 'Invalid fields' });    
  
    const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });    
    } catch (error) {
      next({ status: 500, error });
    }    
  },
};
