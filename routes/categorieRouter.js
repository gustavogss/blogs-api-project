const express = require('express');
const categorieValidated = require('../middlewares/categorieValidated');

const {
  getAllCategories,
  createCategories,
} = require('../controllers/categoriesController');

const token = require('../middlewares/tokenValidated');

const router = express.Router();

router.post('/', token, categorieValidated, createCategories);
router.get('/', token, getAllCategories);

module.exports = router;
