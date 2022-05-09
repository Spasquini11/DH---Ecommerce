const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const mainController = require('../controllers/mainController');

router.get('/', mainController.index );            
router.get('/help', mainController.help);           



module.exports = router