const db = require("../models/index");
const cloudinary = require("cloudinary").v2;

const dbProduct = db.Product;
const dbCategoryProduct = db.CategoryProduct;
dbProduct.belongsTo(dbCategoryProduct, {
  foreignKey: "category_product_id",
});
dbCategoryProduct.hasMany(dbProduct, {
  foreignKey: "category_product_id",
});

const getAllProduct = async (req, res) => {
  try {
    const shop_id = req.query.shop_id;
    const products = await dbProduct.findAll({
      where: {
        shop_id: shop_id,
      },
      include: [
        {
          model: dbCategoryProduct,
          attributes: ["category_name"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const data = products.map((product) => {
      return { ...product.toJSON(), ...product.CategoryProduct.toJSON() };
    });

    const finalData = data.map((product) => {
      delete product.CategoryProduct;
      return product;
    });

    return res.status(200).json(finalData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const image = req.body.image;
    const fileName = req.body.fileName.split(".")[0];
    const data = req.body;
    const url_image = await cloudinary.uploader.upload(image, {
      folder: "motocycle_image",
      public_id: fileName,
    });
    await dbProduct.create({
      code: data.product_code,
      product_name: data.product_name,
      category_product_id: data.category_product_id,
      shop_id: data.shop_id,
      product_price: data.product_price,
      product_quantity: data.product_quantity,
      product_image_url: url_image.url,
    });
    return res.status(200).json({
      status: "success",
      message: "Add product successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await dbProduct.findByPk(id, {
      include: [
        {
          model: dbCategoryProduct,
          attributes: ["category_name"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    const finalData = {
      ...product.toJSON(),
      ...product.CategoryProduct.toJSON(),
    };
    delete finalData.CategoryProduct;
    return res.status(200).json(finalData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (data.image) {
      const image = data.image;
      const fileName = data.fileName.split(".")[0];
      const url_image = await cloudinary.uploader.upload(image, {
        folder: "motocycle_image",
        public_id: fileName,
      });
      await dbProduct.update(
        {
          product_image_url: url_image.url,
        },
        {
          where: { id: id },
        }
      );
    }
    await dbProduct.update(
      {
        code: data.product_code,
        product_name: data.product_name,
        category_product_id: data.category_product_id,
        product_price: data.product_price,
        product_quantity: data.product_quantity,
      },
      {
        where: { id: id },
      }
    );
    console.log(data);
    return res.status(200).json({
      status: "success",
      message: "Update product successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    await dbProduct.destroy({
      where: { id: id },
    });
    return res.status(200).json({
      status: "success",
      message: "Delete product successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProduct,
  addNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
