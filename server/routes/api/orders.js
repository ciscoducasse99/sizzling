"use strict";

module.exports = (app, db) => {
  //Getting singular order
  app.get("/orders", (req, res) => {
    db.Orders.findAll({
      //eager loading
      include: [{ model: db.Menu, as: "items", through: db.Menu_Orders }],
    })
      .then((order) => {
        res.send(order);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // POST new Order to DB
  app.post("/orders/:customer_id/new-order", async (req, res) => {
   console.log(req.body)
    try {
      const savedOrder = await db.Orders.create({customer_id:parseInt(req.params.customer_id)});
      
      req.body.forEach(async (item) => {
        const product = await db.Menu.findByPk(item);
        if (!product) return res.status(400);

        const menu_order = {
          order_id: savedOrder.order_id,
          food_id: item,
        }

        const updatedOrder = await db.Menu_Orders.create(menu_order);
      });

      return res.status(200).json(savedOrder)
    } catch (err) {
      res.send(err);
      console.log(err.message);
    }
  });
};

