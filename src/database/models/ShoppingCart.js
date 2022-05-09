module.exports = (sequelize, dataTypes) => {

    let alias = 'ShoppingCart'; 

    let cols = {                                        
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        

        price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_user: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_credit_card: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }  
    };

    let config = {
        timestamps: false  
    }

    const ShoppingCart = sequelize.define(alias,cols,config);


    ShoppingCart.associate = function (models) {        
        
        ShoppingCart.belongsTo(models.User, {            
            as: "userSQL",                                 
            foreignKey: 'id_user',                      
            timestamps: false
        }),

        ShoppingCart.belongsTo(models.CreditCard, {         
            as: "creditCard",                          
            foreignKey: 'id_credit_card',                 
            timestamps: false
        })
    }
    return ShoppingCart;
};