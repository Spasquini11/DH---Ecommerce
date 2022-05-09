const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/api/apiUsersController');

router.get('/', apiUsersController.list);
router.get('/search', apiUsersController.search);
router.get('/:id', apiUsersController.detail);
router.delete('/:id', apiUsersController.delete);

module.exports = router;