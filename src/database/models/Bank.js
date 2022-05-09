module.exports = (sequelize, dataTypes) => {

    let alias = 'Bank'; 

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

    const Bank = sequelize.define(alias,cols,config);

  
    
    Bank.associate = function (models) {           
        
        Bank.hasMany(models.CreditCard, {           
            as: "creditCard",                                                                  
            foreignKey: 'id_bank',                  
            timestamps: false
        })
    }
    
    return Bank;
};






