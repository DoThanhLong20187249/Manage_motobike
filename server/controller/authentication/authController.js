const pool = require("../../db").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const e = require("express");
const employee = require("../../models/employee");

const dbAccount = db.Account;
const dbShop = db.Shop;
const dbEmployee = db.Employee;
const dbAcountEmployee = db.AccountEmployee;



// Register
const registerUser = async (req, res) => {
  const { shop_owner_name, shop_name, hotline, shop_address, email, password } =
    req.body;

  console.log(req.body);
  const is_admin = false;

  try {
    const exitingUser = await pool.query(
      'SELECT * FROM "Accounts" WHERE email = $1',
      [email]
    );

    if (exitingUser.rows.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "Tài khoản đã tồn tại",
      });
    }

    const exitingShop = await pool.query(
      'SELECT * FROM "Shops" WHERE shop_name = $1',
      [shop_name]
    );

    if (exitingShop.rows.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "Tên xưởng đã tồn tại",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (exitingShop.rows.length === 0 && exitingUser.rows.length === 0) {
      const newShop = await pool.query(
        'INSERT INTO "Shops" (shop_name, hotline, shop_address, shop_owner_name) VALUES ($1, $2, $3, $4) RETURNING id',
        [shop_name, hotline, shop_address, shop_owner_name]
      );

      await pool.query(
        'INSERT INTO "Accounts" (email, password_account, is_admin, shop_id) VALUES ($1, $2, $3, $4)',
        [email, hashedPassword, is_admin, newShop.rows[0].id]
      );

      return res.status(200).json({
        status: "success",
        message: "Tạo tài khoản thành công",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
// Generate token
const generateAccessToken = (user, role_account) => {
  return jwt.sign(
    {
      id: user.id,
      shop_id: user.shop_id,
      role: role_account,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user, role_account) => {
  return jwt.sign(
    {
      id: user.id,
      shop_id: user.shop_id,
      role: role_account,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

// Login
const loginUser = async (req, res) => {
  try {
    const isEmployee = req.body.isEmployee;
    if (isEmployee) {
      dbEmployee.hasOne(dbAcountEmployee, { foreignKey: "employee_id" });
      dbAcountEmployee.belongsTo(dbEmployee, { foreignKey: "employee_id" });
      dbEmployee.belongsTo(dbShop, { foreignKey: "shop_id" });
      dbShop.hasMany(dbEmployee, { foreignKey: "shop_id" });
      const employee = await dbAcountEmployee.findOne({
        where: { email_employee: req.body.email },
        include: [
          {
            model: dbEmployee,
            attributes: { exclude: ["id","createdAt","updatedAt"] },
            include: [
              {
                model: dbShop,
                attributes: ["shop_name"],
              },
            ],
          },
        ],
        attributes: { exclude: ["createdAt","updatedAt"] },
      });
      const employeeData = employee.toJSON();
      const newEmmployee = {...employeeData ,...employeeData.Employee};
      delete newEmmployee.Employee ;
      if (!employee) {
        return res.status(400).json({
          status: "failed",
          message: "Sai tên tài khoản hoặc mật khẩu",
        });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        employee.password_employee
      );
      if (!validPassword) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid password",
        });
      }


      if (employee && validPassword) {
        const token = generateAccessToken(employee, employee.role_account);
        const refreshToken = generateRefreshToken(employee, employee.role_account);
        const {password_employee, ...data } = newEmmployee;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({
          ...data,...data.Shop,token
        });
      }
    } else {
      dbAccount.belongsTo(dbShop, { foreignKey: "shop_id" });
      dbShop.hasOne(dbAccount, { foreignKey: "shop_id" });

      const user = await dbAccount.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: dbShop ,
            attributes: { exclude: ["id","createdAt","updatedAt"]}
          },

        ],
        attributes: { exclude: ["createdAt","updatedAt"] },
      })

      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "Sai tên tài khoản hoặc mật khẩu",
        });
      }
      const userData = user.toJSON();

      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password_account
      );
      if (!validPassword) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid password",
        });
      }

      if (user && validPassword) {
        userData.role_account = "manager";
        const newUser = {...userData, ...userData.Shop};
        delete newUser.Shop;
        const {password_account, ...data} = newUser;

        const token = generateAccessToken(newUser, newUser.role_account);
        const refreshToken = generateRefreshToken(newUser, newUser.role_account);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({
          ...newUser,token
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      status: "failed",
      message: "Refresh token not found",
    });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "failed",
        message: "Invalid token",
      });
    }
    const newACcessToken = generateAccessToken(user); // create new access token
    const newRefreshToken = generateRefreshToken(user); // create new refresh token
    res.cookie("refreshToken", newRefreshToken, {
      // set new refresh token
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      status: "success",
      message: "Token has been refreshed",
      newUser: {
        accessToken: newACcessToken,
      },
    });
  });
};

// Logout

const userLogout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({
    status: "success",
    message: "User has been logged out",
  });
};

module.exports = {
  registerUser,
  loginUser,
  requestRefreshToken,
  userLogout,
};
