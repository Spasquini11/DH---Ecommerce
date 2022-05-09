
const db = require('../../database/models');
const { Op } = require("sequelize");


const apiProductsController1 = {
    
   list: function (req, res){
       
    db.Product

    .findAll({
        order: [
            ['id', 'DESC'],
        ],
    })

    .then(products => {
        return res.status(200).json({
            total: products.length,   
            data: products[0],         
            url: "api/products/1"
            }
         )                
        })

    }
}

module.exports = apiProductsController1