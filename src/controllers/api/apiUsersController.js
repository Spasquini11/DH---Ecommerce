
const db = require('../../database/models');        
                 
const { Op } = require("sequelize");                

module.exports = {

    list: (req, res) => {
        db.User
            .findAll()   
            .then(users =>{
                return res.status(200).json({
                    total: users.length,                         
                    data: users,          
                    url: "images/users" 
            })
        })
    },

    detail: (req, res) => {
        db.User
            .findByPk(req.params.id)               
            .then(user =>{
                return res.status(200).json({
                data: user                        
            }); 
        })       
    },
    

    delete: (req, res) => {
        db.User 
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                return res.json(response)
            })
    },

    search: (req, res) => {
        db.User 
            .findAll({
                where: {
                    id: { [ Op.like ]: '%' + req.query.keyword + '%' } 
                }
            })
            .then(users => {
                if(users.length > 0 ) {
                    return res.status(200).json(users);    
                }
                    return res.status(200).json('No existe el usuario en la BD');
            })
    }
}
