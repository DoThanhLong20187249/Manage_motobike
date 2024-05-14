const pool = require("../db").pool;
const bcrypt = require("bcrypt");

const getAllEmployee = async (req, res) => {
  const getAllEmployee = await pool.query('SELECT * from "Employees"');
  return res.status(200).json({
    status: "success",
    message: "Get All Account",
    data: getAllEmployee.rows,
  });
};

const getEmployeeById = async (req, res) => {
  
};

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      position_employee,
      gender,
      age,
      shop_id,
      email,
      password,
      role_account,
    } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    const addAcountEmployee = await pool.query(
      'INSERT INTO "Accounts" (email, password_account, role_account,is_admin,"createdAt","updatedAt") VALUES ($1, $2, $3, $4,$5, $6) RETURNING id',
      [email, hashedPasword, role_account, false, new Date(), new Date()]
    );

    await pool.query(
      'INSERT INTO "Employees" (name_employee, phone_employee, address_employee, position_employee, gender_employee, age_employee, account_id, shop_id,"createdAt","updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10) ',
      [
        name,
        phone,
        address,
        position_employee,
        gender,
        age,
        addAcountEmployee.rows[0].id,
        shop_id,
        new Date(),
        new Date(),
      ]
    );

    return res.status(200).json({
      status: "success",
      message: "Add 1 Employee ",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllEmployee,
  getEmployeeById,
  addEmployee,
};
