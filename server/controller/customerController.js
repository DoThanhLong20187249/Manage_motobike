const db = require("../models/index");
const dbCustomer = db.Customer;
const dbShop = db.Shop;
const dbShopCustomer = db.ShopCustomer;

dbShop.hasMany(dbShopCustomer, { foreignKey: "shop_id" });
dbCustomer.hasMany(dbShopCustomer, { foreignKey: "customer_id" });
dbShopCustomer.belongsTo(dbShop, { foreignKey: "shop_id" });
dbShopCustomer.belongsTo(dbCustomer, { foreignKey: "customer_id" });

const getAllCustomer = async (req, res) => {
  const id = req.query.shop_id;
  const data = await dbShopCustomer.findAll({
    where: { shop_id: id },
    include: [
      {
        model: dbCustomer,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const newData = data.map((item) => {
    return {
      ...item.toJSON(),
      ...item.Customer.toJSON(),
    };
  });
  const finalData = newData.map((item) => {
    delete item.Customer;
    return item;
  });
  return res.status(200).json(finalData);
};

const getCustomerById = async (req, res) => {
  const id = req.params.id;
  const data = await dbShopCustomer.findOne({
    where: { id: id },
    include: [
      {
        model: dbCustomer,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const newData = {
    ...data.toJSON(),
    ...data.Customer.toJSON(),
  };
  delete newData.Customer;
  return res.status(200).json(newData);
};

const addCustomer = async (req, res) => {
  const {
    shop_id,
    customer_name,
    customer_phone,
    customer_address,
    customer_gender,
    customer_email,
    customer_age,
  } = req.body;

  const newCustomer = await dbCustomer.create({
    customer_name,
    customer_phone,
    customer_address,
    customer_gender,
    customer_email,
    customer_age,
  });
  await dbShopCustomer.create({
    shop_id,
    customer_id: newCustomer.id,
  });
  return res.status(201).json(newCustomer);
};

// verify token

module.exports = {
  getAllCustomer,
  getCustomerById,
  addCustomer,
};
