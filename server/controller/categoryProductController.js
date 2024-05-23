const db = require("../models/index");
const uploadCloud = require('../middleware/uploadImage')
const cloudinary = require('cloudinary').v2;
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

const updateCategoryProduct = async (req, res) => {
  try {

    const image_url = req.body.image
    const fileName = req.body.fileName.split('.')[0]
    const url_image = await cloudinary.uploader.upload(image_url, {
      folder: "motocycle_image",
      public_id: fileName,
    });
    const id = req.params.id;
    const { category_name, category_description} = req.body

    await CategoryProduct.update( {
      category_name: category_name,
      category_description: category_description,
      category_image_url: url_image.url
    }, {
      where: {
        id: id,
      },
    })

    return res.status(200).json({
      status: "success",
      message: "Update category product successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const getCategoryProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryProduct = await CategoryProduct.findByPk(id,{
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    
    })
    return res.status(200).json(categoryProduct)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  addCategoryProduct,
  getAllCategoryProduct,
  updateCategoryProduct,
  getCategoryProductById
};
