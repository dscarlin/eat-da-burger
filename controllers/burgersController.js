
const db = require('../models')

module.exports = (app) => {

  app.get("/api/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    db.burgers.findAll().then(function(burgerData) {
      res.json(burgerData);
    });
  });
  
  // post route
  app.post("/api/burgers", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    db.burgers.create({burger_name: req.body.burger_name}).then( function(result) {
      console.log(result.dataValues.id);
      // Send back the ID of the new quote
      res.json({ id: result.dataValues.id });
    });
  });
  
  // put route
  app.put("/api/burgers/:id", function(req, res) {
    db.burgers.update({devoured: true},{where: {id: req.params.id}}).then( function(result) {
      console.log(result);
      if (result)
      res.sendStatus(200);
      // Send back response and let page reload from .then in Ajax
      else
      res.sendStatus(422)
    });
  });
}


