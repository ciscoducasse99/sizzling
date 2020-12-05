"use strict";

module.exports = (app, db) => {
  app.get("/menu", (req, res) => {
    db.Menu.findAll()
      .then(foods => {
        res.json(foods);
        console.log('getting foods');
      })
      .catch(err => console.log("> ERROR: ", err.message));
  });

  app.post("/menu", (req, res) => {
    const { menuData } = req.body;


    db.Menu.bulkCreate(menuData)
      .then( items =>{
        res.send(items);
        console.log('New items posted: ', items)
      })
      .catch(err =>{
        console.log('> Error: ', err)
      })

  });
};
