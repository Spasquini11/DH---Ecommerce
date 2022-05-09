module.exports = (sequelize, dataTypes) => {

    let alias = 'Type';   

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

    const Type = sequelize.define(alias,cols,config);
    
    Type.associate = function (models) {            
        
        Type.hasMany(models.Product, {              
            as: "product",                           
            foreignKey: 'id_type',                  
            timestamps: false
        })
    }
    return Type;
};