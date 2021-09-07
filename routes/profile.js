const express = require("express");

const { checkToken } = require("./auth/tokenValidation");
const User = require("../models/User");
const router = express.Router();

router.post("/api/user/update", checkToken, async (req, res) => {
  try {
    user_id = req.verifiedUser.userId;
    const user = new User();
    await user.update(req.body, { user_id });
    res.status(200).json({
      success: 1,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: 0,
      message: "something went wrong",
    });
  }
});

module.exports = router;
