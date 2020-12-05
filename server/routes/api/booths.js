"use strict";

module.exports = (app, db) => {
  // Get All Tables
  app.get("/booths", (req, res) => {
    db.Booths.findAll({
      include: [{ model: db.Seatings, as: "current_seating" }],
    })
      .then((booths) => {
        res.send(booths);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/booths/seatings", (req, res) => {
    db.Seatings.findAll({
      include: [
        {
          model: db.Customers,
          as: "customers",
          include: [
            {
              model: db.Orders,
              as: "orders",
              include: [
                { model: db.Menu, as: "items", through: db.Menu_Orders },
              ],
            },
          ],
        },
      ],
    })
      .then((seatings) => {
        res.send(seatings);
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  });

  app.put("/booths/seatings", async (req, res) => {
    // update seatings.boothId
    // update seatings.active
    // update seatings.customers[].active'

    try {
      // Find and return the correct Seatings row
      const seating = await db.Seatings.findByPk(req.body.seatingId, {
        include: [{ model: db.Customers, as: "customers" , 
        include:[{model: db.Orders, as : "orders"}]}],
      });

      if (!seating) throw Error;

      if (seating.active === false) {
        let updatedSeating = await Promise.all([
          seating.update({
            active: true,
            booth_id: req.body.boothId,
          }),

          // returns as null, but still updates customers... making note to return later.
          seating.customers.map((customer) => {
            customer.update({ active: true });
          }),
        ]);

        const booth = await db.Booths.findByPk(req.body.boothId,
          {include: [{model: db.Seatings, as: "current_seating"}]})

        const response = {
          updatedSeating,
          booth
        }
        res.status(200).send(response);
      }
    } catch (err) {
      res.send(err);
    }
  });

  app.patch("/booths/seatings", async (req, res) => {
    try {
      const booth = await db.Booths.findByPk(req.body.booth_id, {
        include: [
          {
            model: db.Seatings,
            as: "current_seating",
            include: [{ model: db.Customers, as: "customers" }],
          },
        ],
      });

      const updatedCustomers = await booth.current_seating.customers.map(
        (customer) => {
          customer.update({ active: false, seatings_id: null });
        }
      );
      const destroyedSeating = await booth.current_seating.destroy()
      const updatedBooth = await booth.update({ current_seating: null });

      const response = {
        updatedCustomers,
        destroyedSeating,
        updatedBooth,
      };


       res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  app.delete(`/booths/seatings/:seatings_id`, async (req, res) => {
    const seating = await db.Seatings.findByPk(req.params.seatings_id, {
      include: [{ model: db.Customers, as: "customers" }],
    });
    const response = await seating.destroy();
    res.send(response);
  });
};

// Clear table
//Doesn't delete the table, because tables can't be deleted. But clears the customers sitting in
