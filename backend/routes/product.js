const express = require('express'); //import express
const router  = express.Router();
const productController = require('../controllers/product');

// Route for listing all products
router.get('/api/products', productController.listProduct);

// Route for adding a new product
router.post('/api/products', productController.newProduct);

// Route for adding a new product
router.post('/api/test-product', productController.testCreate);

// Route for assigning a ticket to an available support agent
// router.delete('/api/products', productController.deleteProduct);

module.exports = router; // export to use in server.js
