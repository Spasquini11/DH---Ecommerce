const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const User = require('../models/Users');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    index: (req,res) => {
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	
        res.render('users/users', {users: users});
    },
	
	register: function (req,res){
        res.render('users/register')
    },
	
	processRegister: (req, res) => {
	
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),				
				oldData: req.body
			});
		}
				
		let userInDB = User.findByField('email', req.body.email);	
		console.log(userInDB);
	

		let userToCreate = {
			...req.body,															
			password: bcryptjs.hashSync(req.body.password, 10),
			repassword: bcryptjs.hashSync(req.body.password, 10),
			image: req.file == undefined ? 'image_user_default.png': req.file.filename 
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('login');

	},

    detail: (req,res) => {

        let idUser = req.params.id 
		const userMostrar = users.find(el => el.id == idUser); 
		res.render('users/detail', {user: userMostrar});
    },

	login: (req,res) => {
        res.render('users/login')
    },

	loginProcess: (req, res) => {

		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {

			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 3 })  
				}

				return res.redirect('/');
			} 

			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}
		
		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este usuario en la base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('userProfile', {
		user: req.session.userLogged
		});		
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	redirect:function(req,res){
        res.redirect('index')
    } 

};

module.exports = usersController