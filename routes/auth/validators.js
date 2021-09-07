const { check } = require("express-validator");
const User = require('../../models/User');

module.exports = {
    requireUsername : check('username')
    .trim()
    .isLength({min : 2, max : 20})
    .withMessage("Must be betwee{n 2 to 20 letters")
    .custom(async (username) =>{
      const user = new User();
      const existingUsername = await user.getOneBy({username});
      if (existingUsername.length > 0) {
        throw new Error("Username is not available");
      }
    }),
    requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 6 to 20 letters"),
    requireConfirmPassword: check("password2")
    .trim()
    .custom((password2, { req }) => {
      if (password2 !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true;
      }
    }),
}