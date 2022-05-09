const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const path = require("path");
const { body } = require('express-validator');


const usrsController = require('../controllers/usrsController');
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

const guestMiddleware = require('../middlewares/guestMiddleware');

const validations = [
    body('first_name')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('last_name')
		.notEmpty()
		.withMessage('Tienes que escribir un apellido')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty()
		.withMessage('Tienes que escribir una contraseña')
		.isLength({ min: 8 })
		.withMessage('Contraseña inválida, mínimo de 8 caracteres'),
	body('repassword')
		.notEmpty()
		.withMessage('Tienes que escribir una contraseña').bail()
		.isLength({ min: 8 })
		.withMessage('Contraseña inválida, mínimo de 8 caracteres'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]


router.get('/login', guestMiddleware, usrsController.login ); 

router.post('/login', usrsController.loginProcess);

router.get('/logout', usrsController.logout);

router.get('/', usrsController.list)                

router.get('/create', guestMiddleware, usrsController.create);       
router.post('/create', uploadFile.single('image'), validations, usrsController.store);       

router.get('/:id', usrsController.detail);          

router.get('/edit/:id', usrsController.edit);       
router.patch('/edit/:id', usrsController.update);        

router.delete('/:id', usrsController.destroy);                          

module.exports = router