module.exports = (sequelize, dataTypes) => {

    let alias = 'CreditCard';  

    let cols = {                 

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        

        number: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },

        expire_date: {
            type: dataTypes.DATE,
            allowNull: false
        },

        document: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

        id_user: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_card_type: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_bank: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }   
    };

    let config = {
        timestamps: false
    }

    const CreditCard = sequelize.define(alias,cols,config);
    
    CreditCard.associate = function (models) {        
        
        CreditCard.belongsTo(models.User, {         
            as: "userSQL",                             
            foreignKey: 'id_user',                  
            timestamps: false
        }),

        CreditCard.belongsTo(models.Bank, {         
            as: "bank",                             
            foreignKey: 'id_bank',                  
            timestamps: false
        }),

        CreditCard.belongsTo(models.CardType, {      
            as: "cardType",                          
            foreignKey: 'id_card_type',              
            timestamps: false
        }),

        CreditCard.hasMany(models.ShoppingCart, {     
            as: "shoppingCart",                       
            foreignKey: 'id_credit_card',             
            timestamps: false
        })

    }
    return CreditCard;
};