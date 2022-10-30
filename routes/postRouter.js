const express = require('express');
const token = require('../middlewares/tokenValidated');

const postValidated = require('../middlewares/postValidated');
const updateValidated = require('../middlewares/updatedPostValidated');

const { 
  getAllPost,
  getByIdPost,
  getByQueryPost,
  createPost,
  updatePost,
  removePost,
 } = require('../controllers/postController');

const router = express.Router();

router.post('/', token, postValidated, createPost);
router.post('/:id');
router.get('/', token, getAllPost);
router.get('/search', token, getByQueryPost);
router.get('/:id', token, getByIdPost);
router.put('/:id', token, updateValidated, updatePost);
router.delete('/:id', token, removePost);

module.exports = router;