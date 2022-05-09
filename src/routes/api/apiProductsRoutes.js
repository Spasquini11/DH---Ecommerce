const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');
const apiProductsController1 = require('../../controllers/api/apiProductsController1');

router.get('/', apiProductsController.list);
router.get('/1', apiProductsController1.list);
router.get('/:id', apiProductsController.detail);

module.exports = router;