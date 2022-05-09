module.exports = (sequelize, dataTypes) => {

    let alias = 'CardType';                                
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

    const CardType = sequelize.define(alias,cols,config);
    
    CardType.associate = function (models) {            
        
        CardType.hasMany(models.CreditCard, {           
            as: "creditCard",                       
            foreignKey: 'id_card_type',                  
            timestamps: false
        })
    }
    return CardType;
};







