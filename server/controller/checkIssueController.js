const db = require("../models/index");
const motocycle = require("../models/motocycle");
const dbCheckIssue = db.CheckIssue;
const dbShop = db.Shop;
const dbEmployee = db.Employee;
const dbMotocycle = db.Motocycle;
const dbCustomer = db.Customer;
const dbCategoryIssue = db.CategoryIssue;
const dbCheckList = db.CheckList;

// accsociate table
dbCheckIssue.belongsTo(dbShop, { foreignKey: "shop_id" });
dbCheckIssue.belongsTo(dbEmployee, { foreignKey: "employee_id" });
dbCheckIssue.belongsTo(dbMotocycle, { foreignKey: "motocycle_id" });
dbCheckIssue.belongsTo(dbCategoryIssue, { foreignKey: "cateogry_issue_id" });
dbMotocycle.belongsTo(dbCustomer, { foreignKey: "customer_id" });
dbCustomer.hasMany(dbMotocycle, { foreignKey: "customer_id" });
dbShop.hasMany(dbCheckIssue, { foreignKey: "shop_id" });
dbEmployee.hasMany(dbCheckIssue, { foreignKey: "employee_id" });
dbMotocycle.hasMany(dbCheckIssue, { foreignKey: "motocycle_id" });
dbCategoryIssue.hasMany(dbCheckIssue, { foreignKey: "cateogry_issue_id" });
dbCheckList.belongsTo(dbCheckIssue, { foreignKey: "check_issue_id" });
dbCheckIssue.hasMany(dbCheckList, { foreignKey: "check_issue_id" });

const getAllcheckIssues = async (req, res) => {
  const shop_id = req.query.shop_id;
  try {
    const checkIssues = await dbCheckIssue.findAll({
      where: {
        shop_id: shop_id,
      },
      include: [
        {
          model: dbMotocycle,
          attributes: ["motocycle_name", "motocycle_number"],
          include: {
            model: dbCustomer,
            attributes: ["customer_name"],
          },
        },
        {
          model: dbEmployee,
          attributes: ["name_employee"],
        },
        {
          model: dbCategoryIssue,
          attributes: ["category_issue_name"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const data = checkIssues.map((checkIssue) => {
      return {
        id: checkIssue.id,
        shop_id: checkIssue.shop_id,
        motocycle_id: checkIssue.motocycle_id,
        employee_id: checkIssue.employee_id,
        cateogry_issue_id: checkIssue.cateogry_issue_id,
        Employee_name: checkIssue.Employee.name_employee,
        Motocycle_name: checkIssue.Motocycle.motocycle_name,
        Customer_name: checkIssue.Motocycle.Customer.customer_name,
        Category_issue_name: checkIssue.CategoryIssue.category_issue_name,
      };
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getInformationByID = async (req, res) => {
  const motocycle_id = req.query.motocycle_id;
  const employee_id = req.query.employee_id;
  try {
    const motocycle = await dbMotocycle.findOne({
      where: {
        id: motocycle_id,
      },
      include: {
        model: dbCustomer,
        attributes: ["customer_name"],
      },
      attributes: ["motocycle_name", "motocycle_number"],
    });

    const employee = await dbEmployee.findOne({
      where: {
        id: employee_id,
      },
      attributes: ["name_employee"],
    });
    return res.status(200).json({
      motocycle_name: motocycle.motocycle_name,
      motocycle_number: motocycle.motocycle_number,
      customer_name: motocycle.Customer.customer_name,
      employee_name: employee.name_employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const addCheckIssue = async (req, res) => {
  try {
    const data = req.body;
    const checkIssue = await dbCheckIssue.create({
      shop_id: data.shop_id,
      motocycle_id: data.motocycle_id,
      employee_id: data.employee_id,
      cateogry_issue_id: data.category_issue_id,
      status: data.status,
    });
    // add check list for check issue field todos
    const todos = data.todos;
    if (todos.length === 0) {
      await dbCheckList.create({
        action: "Không có công việc",
        status: null,
        check_issue_id: checkIssue.id,
      });
    }
    await dbCheckList.bulkCreate(
      todos.map((todo) => {
        return {
          action: todo.acction,
          status: todo.status,
          check_issue_id: checkIssue.id,
        };
      })
    );

    return res.status(200).json("Thêm thành công");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const deleteCheckIssue = async (req, res) => {
  const id = req.params.id;
  try {
    const checkIssue = await dbCheckIssue.findOne({
      where: {
        id: id,
      },
    });
    await dbCheckList.destroy({
      where: {
        check_issue_id: checkIssue.id,
      },
    });

    await dbCheckIssue.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json("Xóa thành công");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports = {
  getAllcheckIssues,
  getInformationByID,
  addCheckIssue,
  deleteCheckIssue,
};
