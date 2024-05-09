const pool = require("../db").pool;

const getAllAccount = async (req, res) => {
  const allAccount1 = await pool.query(
    "select user_id ,name,email,password,role, TO_CHAR(create_at, 'YYYY-MM-DD HH24:MI:SS') from Employee, users where users.id = employee.user_id"
  );
  const allAccount2 = await pool.query(
    "select user_id, name,email,password,role, TO_CHAR(create_at, 'YYYY-MM-DD HH24:MI:SS') from Customer, users where users.id = customer.user_id"
  );
  const allAcccount = allAccount1.rows.concat(allAccount2.rows);
  res.status(200).json({
    status: "success",
    message: "Get All Account",
    data: allAcccount,
  });
};

const getAccountById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM Users WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get Account By Id",
      data: result.rows,
    });
  });
};

module.exports = {
  getAllAccount,
  getAccountById,
};
