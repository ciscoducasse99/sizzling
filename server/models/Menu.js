"use strict";

module.exports = (sequelize, Datatypes) => {
  const Menu = sequelize.define('Menu', {
    food_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      required: true
    },
    food_type:{
        type:Datatypes.STRING,
        allowNull:false
    },
    food_name: {
      type: Datatypes.STRING,
      allowNull: false,
      required: true
    },
    food_price: {
      type: Datatypes.DOUBLE,
      allowNull: false,
      required: true
    },
    food_display_price:{
      type:Datatypes.STRING,
    },
    food_desc: {
      type: Datatypes.TEXT,
      allowNull: false,
      required: true
    },
    food_image: {
      type: Datatypes.STRING,
      allowNull: true,
      required: false
    }
  },
  { freezeTableName: true,
    tableName:'Menu'
  });

  return Menu;
};
