const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blog-controllers')

router.get('/',blogControllers.homePage);
router.get('/aboutPage',blogControllers.aboutPage);
router.get('/category/:categoryName',blogControllers.categoriesContent);
router.get('/post/:id/:postName',blogControllers.postDetails);
router.post('/search',blogControllers.searchPost);
router.get('/create',blogControllers.create_get);
router.get('/category-add',blogControllers.add_category);
router.post('/create', blogControllers.create_post);
router.get('/editPost/:id',blogControllers.edit_post);
router.put('/editPost/:id',blogControllers.editPost_put);
router.delete('/deletePost/:id',blogControllers.deletePost);
router.post('/addNewCategory',blogControllers.newCategory)
router.get('/editCategory/:id',blogControllers.editCategory_get);
router.put('/editCategory/:id',blogControllers.editCategory_put);

module.exports = router;