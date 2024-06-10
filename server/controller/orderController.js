const { where } = require("sequelize");
const checklist = require("../models/checklist");
const db = require("../models/index");

const dbOrder = db.Order;
const dbOrderDetail = db.OrderDetail;
const dbCheckList = db.CheckList;

const dbCheckIssue = db.CheckIssue;
const dbShop = db.Shop;
const dbEmployee = db.Employee;
const dbMotocycle = db.Motocycle;
const dbCustomer = db.Customer;
const dbCategoryIssue = db.CategoryIssue;

// associate 
dbOrder.belongsTo(dbCheckIssue, { foreignKey: "check_issue_id" });
dbCheckIssue.hasMany(dbOrder, { foreignKey: "check_issue_id" });

dbOrderDetail.belongsTo(dbOrder, { foreignKey: "order_id" });
dbOrder.hasMany(dbOrderDetail, { foreignKey: "order_id" });

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



const addNewOrder = async (req, res) => {
  try {
    const check_issue_id = req.params.id;
    const { product_list, action_list, shop_id, total_price, order_code } =
      req.body;
    const newOrder = await dbOrder.create({
      shop_id: shop_id,
      check_issue_id: check_issue_id,
      order_total_price: total_price,
      order_code: order_code,
      payment_method: "Tiền mặt",
    });
    const order_id = newOrder.id;
    await dbOrderDetail.bulkCreate(
      product_list.map((product) => {
        return {
          product_id: product.product_id,
          order_id: order_id,
          price: product.product_price,
          quantiy: product.product_quantity,
        };
      })
    );
    await dbCheckList.destroy({
      where: {
        check_issue_id: check_issue_id,
      },
    });
    await dbCheckList.bulkCreate(
      action_list.map((todo) => {
        return {
          check_issue_id: check_issue_id,
          action: todo.action,
          status: todo.status,
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
function formatDate(isoString) {
  const date = new Date(isoString);
  
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() trả về tháng từ 0-11, nên cần cộng thêm 1
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}


const getAllOrder = async (req, res) => {
  const { shop_id } = req.query;
  try {
    const order = await dbOrder.findAll({
      include:{
        model: dbCheckIssue,
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
      },
      attributes: ["id","order_total_price", "order_code", "payment_method","createdAt"] 
    },{
      where: {
        shop_id: shop_id,
      },
    });
    const data = order.map((item) => {
      return {
        id: item.id,
        order_code: item.order_code,
        order_total_price: item.order_total_price,
        payment_method: item.payment_method,
        createdAt: formatDate(item.createdAt),
        motocycle_name: item.CheckIssue.Motocycle.motocycle_name,
        motocycle_number: item.CheckIssue.Motocycle.motocycle_number,
        customer_name: item.CheckIssue.Motocycle.Customer.customer_name,
        employee_name: item.CheckIssue.Employee.name_employee,
        category_issue_name: item.CheckIssue.CategoryIssue.category_issue_name,
      }
    })
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  addNewOrder,
  getAllOrder
};
