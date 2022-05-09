module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';  

    let cols = {  

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },    

        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },

        description: {
            type: dataTypes.STRING(250),
            allowNull: true
        },

        price: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false            
        },

        discount: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },

        image1: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        image2: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        image3: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        image4: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        color: {
            type: dataTypes.STRING(50),
            allowNull: true
        },  

        size: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },

        sale: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },

        id_category: dataTypes.BIGINT(10),
        id_genre: dataTypes.BIGINT(10),
        id_type: dataTypes.BIGINT(10),
        id_brand: dataTypes.BIGINT(10)        
    };

    let config = {
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);
    
    Product.associate = function (models) {             

        Product.belongsTo(models.Genre, {               
            as: "genre",                                
            foreignKey: "id_genre"                      
        })      

        Product.belongsTo(models.Category, {               
            as: "category",                                
            foreignKey: "id_category"                      
        })

        Product.belongsTo(models.Brand, {               
            as: "brand",                                
            foreignKey: "id_brand"                      
        })   
        
        Product.belongsTo(models.Type, {               
            as: "type",                                
            foreignKey: "id_type"                      
        })   

        Product.hasMany(models.CartDetail, {           
            as: "cartDetails",                         
            foreignKey: 'id_product',                  
            timestamps: false
        })
    }

    return Product;
};