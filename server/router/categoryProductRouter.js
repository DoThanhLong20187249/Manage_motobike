const express = require('express');
const router = express.Router();

const categoryProductController = require('../controller/categoryProductController');
const middlewareController = require('../middleware/middlewareController')


router.get('/',middlewareController.verifyToken ,categoryProductController.getAllCategoryProduct);

router.post('/add', categoryProductController.addCategoryProduct);

module.exports = router;