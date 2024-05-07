const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken : (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({
            status: "failed",
            message: "Invalid token",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Access denied",
      });
    }
  },

  verifyTokenAdmin :( req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          status: "failed",
          message: "Forbidden",
        });
      }
    });
  }
}
  
module.exports = middlewareController