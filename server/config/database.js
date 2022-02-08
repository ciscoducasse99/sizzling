const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customers = require("../models/Customer.js")(sequelize, Sequelize);
db.Seatings = require("../models/Seatings")(sequelize, Sequelize);
db.Booths = require("../models/Booth")(sequelize, Sequelize);
db.Orders = require("../models/Order.js")(sequelize, Sequelize);
db.Menu = require("../models/Menu.js")(sequelize, Sequelize);
db.Menu_Orders = require("../models/Menu_Orders.js")(sequelize, Sequelize);

// ASSOCIATIONS
// One Booth has many customers
// One customer has many orders
// Many orders has many menu items through menu_orders

db.Booths.hasOne(db.Seatings, {
  as: "current_seating",
  foreignKey: "booth_id",
});
db.Seatings.belongsTo(db.Booths, { foreignKey: "booth_id" });

db.Seatings.hasMany(db.Customers, {
  as: "customers",
  foreignKey: "seatings_id",
});
db.Customers.belongsTo(db.Seatings, { foreignKey: "seatings_id" });

db.Customers.hasMany(db.Orders, { as: "orders", foreignKey: "customer_id" });
db.Orders.belongsTo(db.Customers, { foreignKey: "customer_id" });

db.Orders.belongsToMany(db.Menu, {
  as: "items",
  through: db.Menu_Orders,
  foreignKey: "order_id",
  otherKey: "food_id",
});
db.Menu.belongsToMany(db.Orders, {
  through: db.Menu_Orders,
  foreignKey: "food_id",
  otherKey: "order_id",
});

module.exports = db;
