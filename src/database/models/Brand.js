module.exports = (sequelize, dataTypes) => {

    let alias = 'Brand';    

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

    const Brand = sequelize.define(alias,cols,config);
    
    Brand.associate = function (models) {            
        
        Brand.hasMany(models.Product, {           
            as: "product",                           
            foreignKey: 'id_brand',                  
            timestamps: false
        })
    }
    return Brand;
};