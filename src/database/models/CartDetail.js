module.exports = (sequelize, dataTypes) => {

    let alias = 'CartDetail';                           
    let cols = {    

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        quantity: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },     

        total_price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_cart: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },

        id_product: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }  
    };

    let config = {
        timestamps: false
    }

    const CartDetail = sequelize.define(alias,cols,config);
       
    CartDetail.associate = function (models) {        
        
        CartDetail.belongsTo(models.ShoppingCart, {     
            as: "shoppingcart",                         
            foreignKey: 'id_cart',                      
            timestamps: false
        }),

        CartDetail.belongsTo(models.Product, {         
            as: "product",                          
            foreignKey: 'id_product',              
            timestamps: false
        })
    }
    return CartDetail;
};