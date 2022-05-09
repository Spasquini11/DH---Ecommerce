module.exports = (sequelize, dataTypes) => {

    let alias = 'Genre';    

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

    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = function (models) {            
        
        Genre.hasMany(models.Product, {              
            as: "product",                           
            foreignKey: 'id_genre',                  
            timestamps: false
        })
    }
    return Genre;
};