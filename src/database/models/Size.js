module.exports = (sequelize, dataTypes) => {

    let alias = 'Size';     

    let cols = {   

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },   

        size: {
            type: dataTypes.STRING(255),
            allowNull: true
        }              
    };

    let config = {
        timestamps: false
    }

    const Size = sequelize.define(alias,cols,config);
  
    return Size;
};