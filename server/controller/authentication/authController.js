const pool = require("../../db").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models/index")

const dbAccount = db.Account;


// Register
const registerUser = async (req, res) => {
  const { shop_owner_name, shop_name, hotline, shop_address, email, password } =
    req.body;

    console.log(req.body)
  const is_admin = false;
  const role_account = "manager";

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
      const newAccount = await pool.query(
        'INSERT INTO "Accounts" (email, password_account, role_account, is_admin,"createdAt","updatedAt") VALUES ($1, $2, $3, $4, $5,$6) RETURNING id',
        [email, hashedPassword, role_account, is_admin, new Date(), new Date()]
      );

      await pool.query(
        'INSERT INTO "Shops" (shop_name, hotline, shop_address, shop_owner_name, account_id,"createdAt","updatedAt") VALUES ($1, $2, $3, $4, $5 , $6, $7)',
        [
          shop_name,
          hotline,
          shop_address,
          shop_owner_name,
          newAccount.rows[0].id,
          new Date(),
          new Date(),
        ]
      );
      return res.status(200).json({
        status: "success",
        message: "Tạo tài khoản thành công",
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
// Generate token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role_account,
      admin: user.rows[0].is_admin,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role_account,
      admin: user.rows[0].is_admin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

// Login
const loginUser = async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM "Accounts" WHERE email = $1', [
      req.body.email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "Sai tên tài khoản hoặc mật khẩu",
      });
    }
  

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password_account
    );
    if (!validPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid password",
      });
    }

    
  


    if (
      user.rows[0].role_account === "receptionist" ||
      user.rows[0].role_account === "staff"
    ) {
      const infoUser = await pool.query(
        'SELECT * FROM "Employees" WHERE account_id = $1',
        [user.rows[0].id]
      );
      user.rows[0].info = infoUser.rows[0];
    } else if (user.rows[0].role_account === "manager") {
      const infoUser = await pool.query(
        'SELECT * FROM "Shops" WHERE  account_id = $1',
        [user.rows[0].id]
      );
      user.rows[0].info = infoUser.rows[0];
    }


    if (user.rows.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
    if (user && validPassword) {
      const { password, ...data } = user.rows[0];
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ ...data, token });
    }
  } catch (error) {
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
      data: {
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
