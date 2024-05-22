const db = require("../models/index");
const CategoryProduct = db.CategoryProduct;
const Shop = db.Shop;
const ShopCategoryProduct = db.ShopCategoryProduct;

ShopCategoryProduct.belongsTo(Shop, { foreignKey: "shop_id" });
ShopCategoryProduct.belongsTo(CategoryProduct, {
  foreignKey: "category_product_id",
});
CategoryProduct.hasMany(ShopCategoryProduct, {
  foreignKey: "category_product_id",
});
Shop.hasMany(ShopCategoryProduct, { foreignKey: "shop_id" });

const addCategoryProduct = async (req, res) => {};

const getAllCategoryProduct = async (req, res) => {
  const shop_id = req.query.shop_id;
  try {
    const categoryProduct = await ShopCategoryProduct.findAll({
      where: {
        shop_id: shop_id,
      },
      include: [
        {
          model: CategoryProduct,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: ["shop_id"],
    });
    const data = categoryProduct.map((item) => {
      return { ...item.toJSON(), ...item.CategoryProduct.toJSON() };
    });
    const finalData = data.map((item) => {
      delete item.CategoryProduct;
      return item;
    });

    return res.status(200).json(finalData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  addCategoryProduct,
  getAllCategoryProduct,
};
