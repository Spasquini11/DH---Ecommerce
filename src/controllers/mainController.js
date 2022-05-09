
const db = require('../database/models'); 				
const sequelize = db.sequelize							



const mainController = {

    index: function (req,res){
        db.Product.findAll()								
			.then(products =>{
				res.render('index.ejs', {products})	 
			})
    },
    
    redirect: (req,res) => {
        res.redirect('index')
    },
    
    help: (req, res) =>{
        res.render('help');
    }    
}

module.exports = mainController