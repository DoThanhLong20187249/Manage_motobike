const db = require("../models/index");
const dbMotocycle = db.Motocycle;
const dbShopMotocycle = db.ShopMotocycle;
const dbShop = db.Shop;
const dbCustomer = db.Customer;
const dbShopCustomer = db.ShopCustomer;

dbShop.hasMany(dbShopMotocycle, { foreignKey: "shop_id" });
dbMotocycle.hasMany(dbShopMotocycle, { foreignKey: "motocycle_id" });
dbShopMotocycle.belongsTo(dbShop, { foreignKey: "shop_id" });
dbShopMotocycle.belongsTo(dbMotocycle, { foreignKey: "motocycle_id" });
dbCustomer.hasMany(dbMotocycle, { foreignKey: "customer_id" });
dbMotocycle.belongsTo(dbCustomer, { foreignKey: "customer_id" });
dbCustomer.hasMany(dbShopCustomer, { foreignKey: "customer_id" });
dbShopCustomer.belongsTo(dbCustomer, { foreignKey: "customer_id" });
dbShop.hasMany(dbShopCustomer, { foreignKey: "shop_id" });


const getAllMotocycle = async (req, res) => {
  // get all motocycle data when shop id is created
  // get all motocycle data when customer id is created
  try {
    const shop_id = req.query.shop_id;
    const motocycles = await dbShopMotocycle.findAll({
      where: { shop_id: shop_id },
      include: [
        {
          model: dbMotocycle,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: dbCustomer,
              attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      attributes: { exclude: ["id", "motocycle_id", "createdAt", "updatedAt"] },
    });
    const data = motocycles.map((motocycle) => {
      return {
        ...motocycle.toJSON(),
        ...motocycle.Motocycle.toJSON(),
        ...motocycle.Motocycle.Customer.toJSON(),
      };
    });
    const finalData = data.map((item) => {
      delete item.Motocycle;
      delete item.Customer;
      return item;
    });

    return res.status(200).json(finalData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getMotocycleById = async (req, res) => {
  const id = req.params.id;
  try {
    const motocycle = await dbShopMotocycle.findOne({
      where: { motocycle_id: id },
      include: [
        {
          model: dbMotocycle,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: dbCustomer,
              attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      attributes: { exclude: ["id", "motocycle_id", "createdAt", "updatedAt"] },
    });
    const data = {
      ...motocycle.toJSON(),
      ...motocycle.Motocycle.toJSON(),
      ...motocycle.Motocycle.Customer.toJSON(),
    };
    delete data.Motocycle;
    delete data.Customer;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const updateMotocycleById = async (req, res) => {
  const id = req.params.id;
  const {
    shop_id,
    motocycle_name,
    motocycle_brand,
    motocycle_color,
    motocycle_year,
    motocycle_number,
    customer_name,
    customer_phone,
    customer_address,
    customer_gender,
    customer_age,
    customer_email,
    customer_id,
  } = req.body;

  try {
    await dbMotocycle.update(
      {
        motocycle_name: motocycle_name,
        motocycle_brand: motocycle_brand,
        motocycle_color: motocycle_color,
        motocycle_year: motocycle_year,
        motocycle_number: motocycle_number,
      },
      {
        where: { id: id },
      }
    );
    await dbCustomer.update(
      {
        customer_name: customer_name,
        customer_phone: customer_phone,
        customer_address: customer_address,
        customer_gender: customer_gender,
        customer_age: customer_age,
        customer_email: customer_email,
      },
      {
        where: { id: customer_id },
      }
    );
    return res.status(200).json({ message: "Motocycle updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const deleteMotocycle = async (req, res) => {
  const id = req.params.id;
  const shop_id = req.user.shop_id;
  try {
    const motocycle = await dbMotocycle.findOne({
      where: { id: id },
    });
    await dbShopMotocycle.destroy({
      where: {
        motocycle_id: id,
        shop_id: shop_id,
      },
    });
    await dbMotocycle.destroy({
      where: { id: id },
    });
    console.log(motocycle);
    await dbShopCustomer.destroy({
      where: {
        customer_id: motocycle.customer_id,
        shop_id: shop_id,
      },
    });
    await dbCustomer.destroy({
      where: { id: motocycle.customer_id },
    });

    return res.status(200).json({ message: "Motocycle deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllMotocycle,
  getMotocycleById,
  updateMotocycleById,
  deleteMotocycle,
};
