const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Op } = require("sequelize");
var bodyParser = require('body-parser');
const { sequelize } = require("sequelize");
const {Locations, Sequelize} = require("../models");
var jsonParser = bodyParser.json();

router.post("/location", async (req, res) => {
    const { county, name, address } = req.body;
        Locations.create({
        county: county,
        name: name,
        address: address
      });
      res.json("SUCCESS");
  });

  router.get('/all-locations', async (req, res) => {
    try{
      Locations.findAll({attributes: ['id','county','name', 'address']})
      .then(Locations => {
          res.status(200).json(Locations);
      })
  }catch(error) {
      // log on console
      console.log(error);

      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
});

router.get('/search/:query', async (req, res) => {
  const Op=Sequelize.Op;
  try{
    const queryFilter=req.params.query;
   
  Locations.findAll(
 { attributes: ['id', 'county', 'name', 'address'],
  where: {
    [Op.or]: [
    {name: {[Op.like]: `%${queryFilter}%`}}, 
    {county: { [Op.like]: `%${queryFilter}%` }},
  ]
    }
 })
    .then(Locations => {
        res.status(200).json(Locations);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get("/locationinfo/:id", async (req, res) => {
    const id = req.params.id;
    Locations.findOne({ where: { id: id } }).then(Locations=>{
      res.json(Locations);
    });
  
  });

  router.delete("/deletelocation/:id", async (req, res) => {
    const id = req.params.id;
    Locations.destroy({ where: { id: id } }).then(Locations=>{
      res.json(Locations);
    });
  
  });

  router.put("/updateLocation/:id", async (req, res) => {
    const id = req.params.id;
    const { county, name, address  } = req.body;
    const locations = await Locations.findOne({ where: { id: id } });
      
        Locations.update(
          { county: county,
            name: name,
            address: address
           },
          { where: { id: locations.id } }
        );
        res.json("SUCCESS");
  });

module.exports = router; 