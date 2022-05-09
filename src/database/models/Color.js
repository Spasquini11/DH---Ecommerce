module.exports = (sequelize, dataTypes) => {

    let alias = 'Color'; 

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

    const Color = sequelize.define(alias,cols,config);

    return Color;
};