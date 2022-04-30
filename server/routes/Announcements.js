const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Announcement } = require("../models");
const { Op } = require("sequelize");
var bodyParser = require('body-parser');
const { sequelize } = require("sequelize");
var jsonParser = bodyParser.json();


router.get("/announcementinfo/:volunteerAnnID", async (req, res) => {
    const volunteerAnnID = req.params.volunteerAnnID;
    Announcement.findOne({ attributes: ['announcement'], where: { id: volunteerAnnID } }).then(Announcement=>{
      res.json(Announcement);
    });
  
  });

  router.get("/announcementinfo/:referrerAnnID", async (req, res) => {
    const referrerAnnID = req.params.referrerAnnID;
    Announcement.findOne({ attributes: ['announcement'], where: { id: referrerAnnID } }).then(Announcement=>{
      res.json(Announcement);
    });
  
  });

  router.put("/updateAnnouncement/:id", async (req, res) => {
    const id = req.params.id;
    const { announcement  } = req.body;
    const announcements = await Announcement.findOne({ where: { id: id } });
      
        Announcement.update(
          { announcement: announcement
           },
          { where: { id: announcements.id } }
        );
        res.json("SUCCESS");
  });

module.exports = router; 