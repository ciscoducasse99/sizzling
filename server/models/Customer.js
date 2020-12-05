'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Customer = sequelize.define('Customers', {
        customer_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        customer_name:{
            type:DataTypes.STRING,
            required:true,
            allowNull:false
        },
        customer_phone:{
            type:DataTypes.STRING,
            required:true,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:0,
            allowNull:false
        }
    })

    return Customer
}