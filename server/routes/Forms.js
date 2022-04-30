const express = require("express");
const router = express.Router();
const { Forms } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const db = require("../models");




router.get("/basicinfo", async (req, res) => {
  const id = req.query.id;
  const user = await Forms.findOne({ where: { id: id } });
  res.json(user);
})





module.exports = router;