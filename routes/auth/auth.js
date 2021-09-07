const express = require("express");
const { genSalt, hash, compare } = require("bcrypt");
const { validationResult } = require("express-validator");
const { sign } = require("jsonwebtoken");

const { checkToken } = require("./tokenValidation");
const User = require("../../models/User");

const {
  requireUsername,
  requirePassword,
  requireConfirmPassword,
} = require("./validators");

const router = express.Router();

router.post(
  "/signup",
  [requireUsername, requirePassword, requireConfirmPassword],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);

      const data = { username: req.body.username, password: req.body.password };
      const user = await new User();
      await user.create(data);
      res.status(201).send("signup successfull");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.post("/signin", async (req, res) => {
  try {
    const user = new User();
    const userData = await user.getOneBy({ username: req.body.username });

    if (!userData.length > 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const comparePassword = await compare(
      req.body.password,
      userData[0].password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const jwt = sign(
      { userId: userData[0].user_id, username: userData[0].username },
      "qp123",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ message: "login successfully", token: jwt });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api", checkToken, (req, res) => {
  console.log(req.verifiedUser);
  res.send("success");
});
module.exports = router;
