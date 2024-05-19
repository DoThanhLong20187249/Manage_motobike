const db = require("../models/index");
const dbCustomer = db.Customer;
const dbShop = db.Shop;
const dbShopCustomer = db.ShopCustomer;
const dbMotocycle = db.Motocycle;
const dbShopMotocycle = db.ShopMotocycle;

dbShop.hasMany(dbShopCustomer, { foreignKey: "shop_id" });
dbCustomer.hasMany(dbShopCustomer, { foreignKey: "customer_id" });
dbShopCustomer.belongsTo(dbShop, { foreignKey: "shop_id" });
dbShopCustomer.belongsTo(dbCustomer, { foreignKey: "customer_id" });
dbMotocycle.belongsTo(dbCustomer, { foreignKey: "customer_id" });
dbCustomer.hasMany(dbMotocycle, { foreignKey: "customer_id" });
dbShopMotocycle.belongsTo(dbShop, { foreignKey: "shop_id" });
dbShopMotocycle.belongsTo(dbMotocycle, { foreignKey: "motocycle_id" });
dbShop.hasMany(dbShopMotocycle, { foreignKey: "shop_id" });
dbMotocycle.hasMany(dbShopMotocycle, { foreignKey: "motocycle_id" });



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
  try {
    const id = req.params.id;
    const data = await dbShopCustomer.findOne({
      where: { id: id },
      include: [
        {
          model: dbCustomer,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: dbShop,
          attributes: ["shop_name"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const newData = {
      ...data.toJSON(),
      ...data.Shop.toJSON(),
      ...data.Customer.toJSON(),
    };
    delete newData.Customer;
    delete newData.Shop;
    return res.status(200).json(newData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
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
    motocycle_name,
    motocycle_brand,
    motocycle_color,
    motocycle_year,
    motocycle_number,
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
    shop_id:shop_id,
    customer_id: newCustomer.id,
  });

  // new motocycle 
  const newMotocycle =await dbMotocycle.create({
    motocycle_name,
    motocycle_brand,
    motocycle_color,
    motocycle_year,
    motocycle_number,
    customer_id: newCustomer.id,
  
  });

  await dbShopMotocycle.create({
    shop_id: shop_id,
    motocycle_id: newMotocycle.id,
  })

  return res.status(201).json(newCustomer);
};

// update customer
const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      customer_name,
      customer_phone,
      customer_address,
      customer_gender,
      customer_email,
      customer_age,
    } = req.body;
    const data = await dbCustomer.update(
      {
        customer_name: customer_name,
        customer_phone: customer_phone,
        customer_address: customer_address,
        customer_gender: customer_gender,
        customer_email: customer_email,
        customer_age: customer_age,
      },
      { where: { id: id } }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// delete customer
const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const motocycle = await dbMotocycle.findOne({ where: { customer_id: id } });
    await dbShopMotocycle.destroy({ where: { motocycle_id: motocycle.id } });
    await dbMotocycle.destroy({ where: { customer_id: id } });
    await dbShopCustomer.destroy({ where: { customer_id: id } });
    await dbCustomer.destroy({ where: { id: id } });
    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

// verify token

module.exports = {
  getAllCustomer,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
