const path = require('path');
const fs = require('fs');
const db = require('../database/models'); 				
const sequelize = db.sequelize							
const {Op} = require('sequelize') 						

const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');
const User = require('../database/models/User');



const usersSQLController = {
	
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
        
		db.User
		.create(req.body)					
		.then(() => {              											
			res.send('Creación Exitosa')	
		});									 
	},
	
    detail: (req,res) => {
        
		db.User.findByPk(req.params.id)					
			.then(user => {																
				res.render('userDetail.ejs', {user});		
			})
    },

	edit: (req,res) => {	
		db.User.findByPk(req.params.id)							
			.then(userToEdit => {								
				res.render('usersEdit', {userToEdit})											
			})		
    },
	
	update: (req,res) => {
        
		db.User.update(req.body, {       			
            where: {                        		
                id:req.params.id					
            }
        })
            .then( user => {
				res.render('/usersSQL', )
            })	
    },

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersSQLController
