const path = require('path');
const fs = require('fs');
const db = require('../database/models'); 				
const sequelize = db.sequelize							
const {Op} = require('sequelize') 						




const Products = db.Product;
const Genres = db.Genre;
const Users = db.User;

const productsController = {
    list: (req,res) => {
		db.Product.findAll()								
			.then(products =>{							
				res.render('productsList.ejs', {products})	 
			})
    },
	create: (req,res) => {
		db.Genre.findAll()                  			
            .then(genres => {         			
				db.Brand.findAll()
					.then(brands => {
						db.Type.findAll()
							.then(types =>{
								db.Category.findAll()
									.then(categories =>{
										res.render("createForm", {genres, brands, types, categories}); 	 	
									})	
							})						
					})				
            })
			    
	},
	
	store: (req, res) => {
	

		db.Product.create({
			...req.body,																
			image1: req.file == undefined ? 'default-image.png': req.file.filename, 
			image2: req.file == undefined ? 'default-image.png': req.file.filename,
			image3: req.file == undefined ? 'default-image.png': req.file.filename,
			image4: req.file == undefined ? 'default-image.png': req.file.filename
			})        																
    	    .then(() => {              												
				res.redirect('/')													
			});											 
	},

	detail: (req,res) => {
		db.Product.findByPk(req.params.id)					
			.then(product => {													
				res.render('detail.ejs', {product});		
			})
    },
    edit: (req, res) => {		

		db.Product.findByPk(req.params.id, {							
			
			include: [
				{
					association:'genre'
				},
				{
					association:'brand'
				},
				{
					association:'type'
				},
				{
					association:'category'
				}
			]
		})

			.then(productToEdit => {
				
				db.Genre.findAll()										
				.then((genres) =>{										
					db.Brand.findAll()
					.then(brands => {
						db.Type.findAll()
						.then(types => {
							db.Category.findAll()
								.then(categories => {
									res.render('modifForm', {productToEdit, genres, brands, types, categories})	
							})
								
						})					
					})						
				})				
			})	
	},							
			
		
    update: (req, res) => {
		db.Product.update(req.body, {       		
            where: {                        		
                id:req.params.id					
            }
        })
            .then(product =>{
                res.redirect('/products')
            })
		
	},	    
    destroy : (req, res) => {
		
		db.Product.findByPk(req.params.id)  				
			.then((product) => {	
				product.destroy()																
					.then(()=> {
						res.redirect('/products')				
					})
			})
	},

	sale: (req,res) => {
        db.Product.findAll()
            .then(products =>{
                res.render('productsListSale.ejs', {products})
            })
    },
	
	search: (req,res) => {                                          
        if(req.query.name){                                         
            db.Product                                              
        		.findAll({                                        
            		where: {                                       
                		name: {                                     
                    		[Op.like]: '%' + req.query.name + '%'     
                		} 
            		}    
        		})    
        .then(products => {                                                 
           if(products.length > 0) { 
               res.render('productsList', {products})                        
			}else{     
				res.render('productsList', {products: []})                  
				}            
			})
		}	         
	}, 
	
	cart: (req,res) =>{
		res.render('underconstruction');
    } 	
}

module.exports = productsController