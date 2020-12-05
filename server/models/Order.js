'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Order = sequelize.define('Orders', {
        order_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }

    })

    return Order
}