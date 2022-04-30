const express = require("express");
const router = express.Router();
const { Users, Sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const db = require("../models");

router.post("/", async (req, res, next) => {
  const {username, password, Firstname, Lastname, Email, Phonenumber, PhoneProvider, Notification, Agency, 
    Agency_zipcode, nearest_location, self_notes, role, avatar, num_assigned, num_held, num_completed } = req.body;

    const usernameCheck = await Users.findOne({ where: { username: username } });

    const emailCheck = await Users.findOne({ where: { Email: Email } });

    if (emailCheck && usernameCheck) {
      res.json({ error: "Both username and email are already in use!" });
     } else if (usernameCheck) {
    res.json({ error: "Username already in use!" });
  } else if (emailCheck) {
    res.json({ error: "Email already in use!" });
  }  else {
    
  bcrypt.hash(password, 10).then((hash) => {

    
    Users.create({
      username: username,
      password: hash,
      Firstname: Firstname, 
      Lastname: Lastname, 
      Email: Email, 
      Phonenumber: Phonenumber, 
      PhoneProvider: PhoneProvider,
      Notification: Notification, 
      Agency: Agency,
      Agency_zipcode: Agency_zipcode,
      nearest_location: nearest_location,
      self_notes: self_notes,
      role: role,
      avatar: avatar,
      num_assigned: num_assigned,
      num_held: num_held,
      num_completed: num_completed,
    });
    res.json("SUCCESS");
  });
}
});

router.post("/login", async (req, res) => {
  const { username, Email, password } = req.body;

  const user = await Users.findOne({ where: { username: username } || { Email: Email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.put("/updateInfo", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});


router.get("/basicinfo", async (req, res) => {
  const id = req.query.id;
  const user = await Users.findOne({ where: { id: id } });
  res.json(user);
})


router.put("/updateUser", validateToken, async (req, res) => {
  const { Firstname, 
    Lastname, 
    Email, 
    Phonenumber,
    PhoneProvider, 
    Notification, 
    agency,
    agency_zipcode,
    role,
    nearest_location,
    self_notes,
    avatar, 
    num_assigned, 
    num_held, 
    num_completed } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });
    
      Users.update(
        { Firstname: Firstname, 
          Lastname: Lastname, 
          Email: Email, 
          Phonenumber: Phonenumber,
          PhoneProvider: PhoneProvider, 
          Notification: Notification, 
          agency: agency,
          agency_zipcode: agency_zipcode,
          role: role,
          nearest_location: nearest_location,
          self_notes: self_notes,
          avatar: avatar, 
          num_assigned: num_assigned,
          num_held: num_held,
          num_completed: num_completed,
        },
        { where: { id: user.id } }
      );
      res.json("SUCCESS");
});


module.exports = router;