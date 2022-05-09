
const db = require('../../database/models');
const { Op } = require("sequelize");


const apiProductsController = {
    
   list: function (req, res){

        let totalCat = 0;

        db.Category
            .findAll()
            .then(categories =>{
                totalCat = categories.length
            })

        db.Product
            .findAll()
            .then(products => {
                return res.status(200).json({
                    total: products.length,  
                    countByCategory : totalCat, 
                    data: products,        
                    url: "api/products"
                    }
                )                
            })

    },

    detail: (req, res) => {
        db.Product
            .findByPk(req.params.id)                
            .then(product =>{
                return res.status(200).json({
                data: product                          
            }); 
            
        })       
    }
}

module.exports = apiProductsController