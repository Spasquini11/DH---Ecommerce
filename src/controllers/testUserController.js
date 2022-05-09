const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const User = require('../models/Users');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

   
	register: function (req,res){
        res.render('users/register')
    },  

    processRegister: (req, res) => {

    const resultValidation = validationResult(req);
    
    res.send(resultValidation.errors);

    if (resultValidation.errors.length > 0) {
        return res.render('users/register', {
            errors: resultValidation.mapped(),				
            oldData: req.body
        });
    }
            
    let userInDB = User.findByField('email', req.body.email);
            
    if (userInDB) {
        return res.render('users/register', {
            errors: {
                email: {
                    msg: 'Este email ya está registrado'
                }
            },
            oldData: req.body
        });
    }	

},
    profile: (req, res) => {
        return res.render('userProfile', {
        user: req.session.userLogged
        });		
    },

}

