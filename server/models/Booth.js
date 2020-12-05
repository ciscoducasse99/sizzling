'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Booth = sequelize.define('Booths', {
        booth_id:{
            type:DataTypes.INTEGER,
            dafaultValue:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
    })
    return Booth
}