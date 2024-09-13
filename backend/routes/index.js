const express = require('express'); //import express
const router  = express.Router();
const productController = require('../controllers/product');
const partsController = require('../controllers/parts');

// Route for listing all products
router.get('/api/products', productController.listProduct);

// Route for adding a new product
router.post('/api/products', productController.newProduct);

// Route for assigning a ticket to an available support agent
// router.delete('/api/products', productController.deleteProduct);

// Route for listing all products
router.get('/api/parts', partsController.listParts);



module.exports = router; // export to use in server.js
