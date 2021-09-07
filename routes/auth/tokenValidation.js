const { verify } = require("jsonwebtoken");
module.exports = {
  checkToken: async (req, res, next) => {
    try {
      let token = req.get("authorization");
      if (!token) {
        return res.json({
          message: "Access denied! unauthorized user",
        });
      }
      token = token.slice(7);
      const verifyToken = await verify(token, "qp123");
      req.verifiedUser = {
        userId: verifyToken.userId,
        username: verifyToken.username,
      };
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  },
};
