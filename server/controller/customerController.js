const pool = require("../db").pool;


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


module.exports = {
  getAllCustomer,
  getCustomerById,
};
