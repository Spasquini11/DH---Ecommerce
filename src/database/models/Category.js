module.exports = (sequelize, dataTypes) => {

    let alias = 'Category';     

    let cols = {           

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },   

        name: {
            type: dataTypes.STRING(255),
            allowNull: true
        }              
    };

    let config = {
        timestamps: false
    }
    
    const Category = sequelize.define(alias,cols,config);
    
    Category.associate = function (models) {            
        
        Category.hasMany(models.Product, {              
            as: "product",                              
            foreignKey: 'id_category',                  
            timestamps: false
        })
    }
    
    return Category;
};