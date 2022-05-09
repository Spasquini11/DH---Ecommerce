const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");


const usersSQLController = require('../controllers/usersSQLController');
const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images/users')
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_user${path.extname(file.originalname)}`
        cb(null, fileName);
    }
})

const uploadFile = multer({storage: storage});

router.get('/create', usersSQLController.create);       
router.post('/create', usersSQLController.store);       


router.get('/', usersSQLController.list)                

router.get('/logout', usersSQLController.logout);

router.get('/:id', usersSQLController.detail);          

router.get('/edit/:id', usersSQLController.edit);       
router.put('/:id', usersSQLController.update);          

module.exports = router