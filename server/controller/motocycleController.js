const db = require("../models/index");
const dbMotocycle = db.Motocycle;
const dbShopMotocycle = db.ShopMotocycle;
const dbShop = db.Shop;
const dbCustomer = db.Customer;

dbShop.hasMany(dbShopMotocycle, { foreignKey: "shop_id" });
dbMotocycle.hasMany(dbShopMotocycle, { foreignKey: "motocycle_id" });
dbShopMotocycle.belongsTo(dbShop, { foreignKey: "shop_id" });
dbShopMotocycle.belongsTo(dbMotocycle, { foreignKey: "motocycle_id" });
dbCustomer.hasMany(dbMotocycle, { foreignKey: "customer_id" });
dbMotocycle.belongsTo(dbCustomer, { foreignKey: "customer_id" });

const addMotocycle = async (req, res) => {};

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
  } = req.body;

  const motocycle = await dbShopMotocycle.findOne({
    where: {
      [Op.and]: [{ shop_id: shop_id }, { motocycle_id: id }],
    },
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
  });
};

module.exports = {
  addMotocycle,
  getAllMotocycle,
  getMotocycleById,
};
