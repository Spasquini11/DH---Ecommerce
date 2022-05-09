const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const upload = require('../middlewares/multer');
const path = require("path");


const usersController = require('../controllers/usersController');
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

const validations = [
    body('firstName')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 2 })
		.withMessage('Un mínimo de 2 caracteres'),
	body('lastName')
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
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/users', usersController.index) 


router.get('/register', guestMiddleware, usersController.register );  

router.post('/register', uploadFile.single('image'), validations, usersController.processRegister);  



router.get('/login', guestMiddleware,usersController.login ); 

router.post('/login', usersController.loginProcess);

 
router.get('/:id', usersController.detail);


router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router