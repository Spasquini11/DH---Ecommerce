module.exports = (sequelize, dataTypes) => {
    let alias = 'User';    

    let cols = {         

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },      

        first_name: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        last_name: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        email: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        password: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        repassword: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        image: {
            type: dataTypes.STRING(100),
            allowNull: true
        },                 
    };

    let config = {
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);

    return User;
};