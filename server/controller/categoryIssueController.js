const db = require("../models/index");
const shop = require("../models/shop");
const dbCategoryIssue = db.CategoryIssue;
const dbShop = db.Shop;

dbCategoryIssue.belongsTo(dbShop, {
  foreignKey: "shop_id",
});
dbShop.hasMany(dbCategoryIssue, {
  foreignKey: "shop_id",
});

const getAllCategoryIssues = async (req, res) => {
  const shop_id = req.query.shop_id;
  try {
    const categoryIssues = await dbCategoryIssue.findAll({
      where: {
        shop_id: shop_id,
      },
    });
    return res.status(200).json(categoryIssues);
  } catch (errors) {
    return res.status(500).json({ errors: errors.message });
  }
};

const addNewCategoryIssue = async (req, res) => {
  const {
    category_issue_name,
    category_issue_level,
    category_issue_description,
    category_issue_solution,
    shop_id,
  } = req.body;
  try {
    await dbCategoryIssue.create({
      category_issue_name,
      category_issue_level,
      category_issue_description,
      category_issue_solution,
      shop_id,
    });
    return res.status(200).json({ message: "Create category issue success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error.message });
  }
};

const getCategoryIssueById = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryIssue = await dbCategoryIssue.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).json(categoryIssue);
  } catch (errors) {
    return res.status(500).json({ errors: errors.message });
  }
};

const updateCategoryIssue = async (req, res) => {
  const id = req.params.id;
  const {
    category_issue_name,
    category_issue_level,
    category_issue_description,
    category_issue_solution,
  } = req.body;
  try {
    await dbCategoryIssue.update(
      {
        category_issue_name: category_issue_name,
        category_issue_level: category_issue_level,
        category_issue_description: category_issue_description,
        category_issue_solution: category_issue_solution,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({ message: "Update category issue success" });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

const deleteCategoryIssue = async (req, res) => {
  const id = req.params.id;
  try {
    await dbCategoryIssue.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Delete category issue success" });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};
module.exports = {
  getAllCategoryIssues,
  addNewCategoryIssue,
  getCategoryIssueById,
  updateCategoryIssue,
  deleteCategoryIssue,
};
