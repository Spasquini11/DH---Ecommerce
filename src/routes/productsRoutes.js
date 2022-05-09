const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");


const productsController = require('../controllers/productsController');
const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images')
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName);
    }
})

const uploadFile = multer({storage: storage});


router.get('/',productsController.list)         

router.get('/search', productsController.search);

router.get('/cart', productsController.cart);

router.get('/sale',productsController.sale)

router.get('/create', productsController.create);   
router.post('/create', uploadFile.single('image1'), productsController.store); 


router.get('/:id', productsController.detail);   


router.get('/edit/:id', productsController.edit);                           
router.put('/:id', uploadFile.single('image1'), productsController.update); 

router.delete('/:id', productsController.destroy);                          


module.exports = router;

