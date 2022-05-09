const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');

const db = require('../database/models'); 				
const sequelize = db.sequelize							
const {Op} = require('sequelize') 						


const usersController = {

	
	list: (req,res) => {
       
		db.User.findAll()								
			.then(users =>{								
				res.render('usersList.ejs', {users})	 
			})

    },
	
	create: (req,res) => {
		
        res.render("usersCreate");
    },
	
	store: function (req,res){

		const resultValidation = validationResult(req);
	
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),				
				oldData: req.body
			});
		}
		db.User
		.create({
			...req.body,																
			password : bcryptjs.hashSync(req.body.password, 10),
			
			image: req.file == undefined ? 'image_user_default.png': req.file.filename   
		
		})		

		.then(() => {			             												
			res.redirect('login');				
		})

		.catch((err) => {
			console.log(err);
		})		
	},

	detail: (req,res) => {
    
		db.User
		.findByPk(req.params.id)
			.then(user => {					 	 
				res.render('userDetail', {user})	 								
			})	
			.catch((err) => {
			console.log(err);
		})	
    },

	edit: (req,res) => {		
		db.User
		.findByPk(req.params.id)					
			.then(userToEdit => {						
				res.render('usersEdit', {userToEdit})									
			})
			.catch((err) => {
				console.log(err);
			})			
    },
	update: (req,res) => {
        
		db.User
		.update(
		{
			...req.body,
			password : bcryptjs.hashSync(req.body.password, 10),			
			image: req.file == undefined ? 'image_user_default.png': req.file.filename 
		},
		{       			
            where: {                        		
                id: req.params.id					
            }
        })
        .then( user => {
			return res.redirect('/')
        })
		.catch((err) => {
			console.log(err);
		})		
    },

	destroy : (req, res) => {
		
		db.User.destroy({								
			where: {									
				id: req.params.id
			}		
		})  				
			.then(() => {
				
				return res.redirect('/')				
			})
			.catch((err) => {
				console.log(err);
			})	
	},
	
	login: (req,res) => {
        res.render('users/login')
    },

	loginProcess: (req, res) => {
		
		let userToLogin = req.body.email;
		
			db.User.findOne({
				where:{
					email: req.body.email
				}
			})								
				.then(user => {								
					
					if(user === null || user === " "){
						
						return res.render('users/login', {
							errors: {
								email: {
									msg: 'Completar con correo/usuario existente'
								}
							}
						});

					} else {

						if(userToLogin === user.email){
							
						let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
							
							if (isOkThePassword) {
									delete userToLogin.password;
							

									req.session.userLogged = user;

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
					}									
				})
				.catch(err => {
					console.log(err)
				})
	},	

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	
	redirect: function(req,res){
         res.redirect('index')
    } 

};

module.exports = usersController