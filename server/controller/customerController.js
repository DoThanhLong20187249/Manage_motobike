const pool = require("../db").pool;
const jwt = require("jsonwebtoken");

const getAllCustomer = (req, res) => {
  pool.query("SELECT * FROM Customer", (err, result) => {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get All Customer",
      data: result.rows,
    });
  });
};

const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM Customer WHERE id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Get Customer By Id",
        data: result.rows,
      });
    }
  );
};

const addCustomer = (req, res) => {};

// verify token

const verifyToken = (req, res, next) => {
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
      console.log(user.id);
      next();
    });
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Access denied",
    });
  }
};

module.exports = {
  getAllCustomer,
  getCustomerById,
  verifyToken,
};
