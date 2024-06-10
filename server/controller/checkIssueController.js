const db = require("../models/index");
const motocycle = require("../models/motocycle");
const dbCheckIssue = db.CheckIssue;
const dbShop = db.Shop;
const dbEmployee = db.Employee;
const dbMotocycle = db.Motocycle;
const dbCustomer = db.Customer;
const dbCategoryIssue = db.CategoryIssue;
const dbCheckList = db.CheckList;
const dbOrder = db.Order;

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
dbCheckIssue.hasMany(dbOrder, { foreignKey: "check_issue_id" });
dbOrder.belongsTo(dbCheckIssue, { foreignKey: "check_issue_id" });

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
        status: checkIssue.status,
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
        action_price: "0"
      });
    }
    await dbCheckList.bulkCreate(
      todos.map((todo) => {
        return {
          action: todo.action,
          status: todo.status,
          check_issue_id: checkIssue.id,
          action_price: todo.action_price,
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
    await dbOrder.destroy({
      where: {
        check_issue_id: id,
      },
    });
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
const getCheckIssueByID = async (req, res) => {
  const id = req.params.id;
  try {
    const checkIssue = await dbCheckIssue.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: dbMotocycle,
          attributes: ["motocycle_name", "motocycle_number", "customer_id"],
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
    const data = checkIssue.toJSON();
    const checkIssueData = {
      id: data.id,
      shop_id: data.shop_id,
      motocycle_id: data.motocycle_id,
      employee_id: data.employee_id,
      customer_id: data.Motocycle.customer_id,
      cateogry_issue_id: data.cateogry_issue_id,
      employee_name: data.Employee.name_employee,
      motocycle_name: data.Motocycle.motocycle_name,
      motocycle_number: data.Motocycle.motocycle_number,
      customer_name: data.Motocycle.Customer.customer_name,
      category_issue_name: data.CategoryIssue.category_issue_name,
      status: data.status,
    };
    const checkList = await dbCheckList.findAll({
      where: {
        check_issue_id: id,
      },
      attributes: ["id", "action", "status", "action_price"],
    });

    return res.status(200).json({ checkIssueData, checkList });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const updateCheckIssue = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await dbMotocycle.update(
      {
        motocycle_name: data.motocycle_name,
        motocycle_number: data.motocycle_number,
      },
      {
        where: {
          id: data.motocycle_id,
        },
      }
    );
    await dbEmployee.update(
      {
        name_employee: data.employee_name,
      },
      {
        where: {
          id: data.employee_id,
        },
      }
    );
    await dbCheckIssue.update(
      {
        cateogry_issue_id: data.category_issue_id,
        status: data.status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    await dbCustomer.update(
      {
        customer_name: data.customer_name,
      },
      {
        where: {
          id: data.customer_id,
        },
      }
    );
    const todos = JSON.parse(data.todos);
    await dbCheckList.destroy({
      where: {
        check_issue_id: id,
      },
    });
    if (todos.length === 0) {
      await dbCheckList.create({
        action: "Không có công việc",
        status: null,
        check_issue_id: id,
        action_price: "0"
      });
    }
    await dbCheckList.bulkCreate(
      todos.map((todo) => {
        return {
          action: todo.action,
          status: todo.status,
          check_issue_id: id,
          action_price: todo.action_price,
        };
      })
    );
    return res.status(200).json("Cập nhật thành công");
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
  getCheckIssueByID,
  updateCheckIssue,
};
