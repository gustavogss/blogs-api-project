const express = require('express');
const userValidated = require('../middlewares/userValidated');
const token = require('../middlewares/tokenValidated');

const {
  getAllUser,
  getByIdUser,
  createUser,
  removeUser, 
} = require('../controllers/userController');

const router = express.Router();

router.post('/', userValidated, createUser);
router.get('/', token, getAllUser);
router.get('/:id', token, getByIdUser);
router.delete('/me', token, removeUser);

module.exports = router; 
