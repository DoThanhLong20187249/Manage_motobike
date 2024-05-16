const pool = require("../db").pool;
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { where } = require("sequelize");
const dbEmployee = db.Employee;
const dbAccount = db.Account;
const dbShop = db.Shop;
const dbAcountEmployee = db.AccountEmployee;

const getAllEmployee = async (req, res) => {
  try {
    const id = req.query.shop_id;
    dbShop.hasMany(dbEmployee, { foreignKey: "shop_id" });
    dbEmployee.belongsTo(dbShop, { foreignKey: "shop_id" });
    
    const shop = await dbShop.findOne({ where: { id: id } });
    const employee = await dbEmployee.findAll({
      where: { shop_id: shop.id },
      attributes: { exclude: ["shop_id", "createdAt", "updatedAt"] },
    });
    const newEmmployee = employee.map((item) => {
      return {
        ...item.toJSON(),
        shop_name: shop.shop_name,
      };
    });
    return res.status(200).json(
      newEmmployee
    )
  }catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    dbEmployee.hasOne(dbAcountEmployee, { foreignKey: "employee_id" });
    dbAcountEmployee.belongsTo(dbEmployee, { foreignKey: "employee_id" });
    dbEmployee.belongsTo(dbShop, { foreignKey: "shop_id" });
    dbShop.hasMany(dbEmployee, { foreignKey: "shop_id" });


    const id = req.params.id;
    const singleEmployee = await dbEmployee.findOne({
      where: { id: id },
      include:  [
      { model: dbShop, attributes: ["shop_name"] }
      ],
      attributes: { exclude: ["shop_id","account_id","createdAt", "updatedAt"] },
    });
    const newSingleEmployee = singleEmployee.toJSON();
    newSingleEmployee.shop_name = singleEmployee.Shop.shop_name;
    delete newSingleEmployee.Shop;
    const account = await dbAcountEmployee.findOne({ where: { employee_id: newSingleEmployee.id } });
    const newAccount = account.toJSON();


    console.log(singleEmployee);

    return res.status(200).json({
      status: "success",
      message: "Get 1 Employee",
      data: {...newSingleEmployee,...newAccount},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
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
    const addEmployee = await pool.query(
      'INSERT INTO "Employees" (name_employee, phone_employee, address_employee, position_employee, gender_employee, age_employee,shop_id,"createdAt","updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING ID ',
      [
        name,
        phone,
        address,
        position_employee,
        gender,
        age,
        shop_id,
        new Date(),
        new Date(),
      ]
    );
    await pool.query(
      'INSERT INTO "AccountEmployees" (email_employee, password_employee, role_account,employee_id,"createdAt","updatedAt") VALUES ($1, $2, $3, $4,$5,$6) RETURNING id',
      [email, hashedPasword, role_account, addEmployee.rows[0].id ,new Date(), new Date()]
    );


    return res.status(200).json({
      status: "success",
      message: "Add 1 Employee ",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const updateEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const {
      name_employee,
      phone_employee,
      address_employee,
      position_employee,
      email_employee,
      password_employee,
      age_employee,
      gender_employee,
    } = req.body;
    const employee = await dbEmployee.findOne({where: {id: id}});

    await dbEmployee.update(
      {
        name_employee: name_employee,
        phone_employee: phone_employee,
        address_employee: address_employee,
        position_employee: position_employee,
        age_employee: age_employee,
        gender_employee: gender_employee
      },
      {
        where: {
          id: id,
        },
      }
    )

     await dbAcountEmployee.update(
      {
        email_employee: email_employee,
        password_employee: password_employee

      },{
        where: {
          employee_id: employee.id,
      }
    }
    )
    return res.status(200).json({
      status: "success",
      message: "Update 1 Employee",
    });

  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

const deleteEmployeeById = async (req, res) => {
  dbAcountEmployee.belongsTo(dbEmployee, { foreignKey: "employee_id" });
  dbEmployee.hasOne(dbAcountEmployee, { foreignKey: "employee_id" });
  try {
    const id = req.params.id;
    const employee = await dbEmployee.findOne({ where: { id: id } });
    await dbAcountEmployee.destroy({ where: { employee_id: employee.id } });
    await dbEmployee.destroy({ where: { id: id } });
    return res.status(200).json({
      status: "success",
      message: "Delete 1 Employee",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {
  getAllEmployee,
  getEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
