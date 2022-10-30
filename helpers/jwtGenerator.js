const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const token = (data = {}) => jwt.sign({ data }, SECRET, JWT_CONFIG);

module.exports = token;