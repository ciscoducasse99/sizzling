"use strict";

module.exports = (app, db) => {
  // Get All Customers
  app.get("/customers", (req, res) => {
    db.Customers.findAll({ include: [{ model: db.Orders, as: "orders" }] })
      .then((customers) => {
        res.json(customers);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // Get single Customers
  app.get(`/customers/:customer_id`, (req, res) => {
    db.Customers.findOne({
      include: [{ model: db.Orders, as: "orders" }],
      where: {
        customer_id: req.params.customer_id,
      },
    })
      .then((customer) => {
        res.json(customer);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // Post new customer
  app.post("/customers", async (req, res) => {
    try {
      const seating = await db.Seatings.create();
      const uploadedCustomers = await Promise.all(req.body.map((customer) => {
         return db.Customers.create({
            customer_name: customer.customer_name,
            customer_phone: customer.customer_phone,
            seatings_id: seating.seatings_id,
          })
        }))
      const uploadedSeating = await db.Seatings.findByPk(seating.seatings_id, {include:[{model: db.Customers, as:'customers'}]})
      const resData={
        uploadedCustomers,
        uploadedSeating
      }

      res.send(resData)

    } catch (err) {
      res.send(err);
      console.log(err);
    }
  });

  // Delete single Customer
  app.delete("/customers/:customer_id", (req, res) => {
    db.Customers.destroy({
      where: {
        seatings_id: req.body,
      },
    })
    .then(()=>{
      res.send(200)
    })
    .catch((err) => {
      res.send(err);
    });
  });
};
