
const db = require('../models')

module.exports = (app) => {
  app.post("/api/customers", (req, res) => {
    
    db.Customers
    .create({
      customer_name: req.body.customer_name,
    })
    .then(data => {console.log(data); res.json(data);});
  })
  

  app.get("/api/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
      console.log('getBurgers')
      db.burgers.findAll({include: [db.Customers]},{order: [['burger_name','ASC']]}).then(function(burgerData) {
        console.log(burgerData)
        res.json(burgerData);
      });
  
  });
  
  // post route
  app.post("/api/burgers", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    db.burgers.create({burger_name: req.body.burger_name}).then( function(result) {
      console.log('id of item added to burgers table: ' + result.dataValues.id);
      // Send back the ID of the new quote
      res.json(result);
    });
  });
  
  // put route
  app.put("/api/burgers/:id", function(req, res) {
    let customerId = req.body.Customer
    db.burgers
    .update(
      {devoured: true, CustomerId: customerId},
      {where: {id: req.params.id}})
    .then( function(result) {
      console.log("PUT: " + result);
      if (result)
      res.sendStatus(200);
      // Send back response and let page reload from .then in Ajax
      else
      res.sendStatus(422)
    });
  });
}


