"use strict";

module.exports = (sequelize, DataTypes) =>{
    const Seatings = sequelize.define('Seatings', {
        seatings_id:{
            type:DataTypes.INTEGER,
            dafaultValue:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:0,
            allowNull:false
        }
    })
    return Seatings
}