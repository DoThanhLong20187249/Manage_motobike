const pool = require("../../db").pool;
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  const { name, phone, address, email, password } = req.body;
  const role = "customer";

  try {
    const exitingUser = await pool.query(
      "SELECT * FROM Account WHERE email = $1",
      [email]
    );
    if (exitingUser.rows.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "customer") {
      const newCustomer = await pool.query(
        "INSERT INTO Customer (name, phone, address) VALUES ($1, $2, $3) RETURNING id",
        [name, phone, address]
      );
      const customer_id = newCustomer?.rows[0].id;
      await pool.query(
        "INSERT INTO Account (email, password,customer_id, role) VALUES ($1, $2, $3, $4)",
        [email, hashedPassword, customer_id, role]
      );
      return res.status(201).json({
        status: "success",
        message: "User has been registered",
      });
    } else if (role === "employee") {
      const position = null;
      const avatar_url = "src/assets/avatar.jpg";
      const newEmployee = await pool.query(
        "INSERT INTO Employee (name, phone, address,position, avatar_url) VALUES ($1, $2, $3, $4,$5) RETURNING id",
        [name, phone, address, position, avatar_url]
      );
      const employee_id = newEmployee?.rows[0].id;
      await pool.query(
        "INSERT INTO Account (email, password,employee_id, role) VALUES ($1, $2, $3 , $4)",
        [email, hashedPassword, employee_id, role]
      );
      return res.status(201).json({
        status: "success",
        message: "User has been registered",
      });
    }
  } catch (err) {
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
      role: user.rows[0].role,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

// Login
const loginUser = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM Account WHERE email = $1", [
      req.body.email,
    ]);
    if (user.rows[0].role === "customer") {
      const infoUser = await pool.query(
        "SELECT * FROM Customer WHERE id = $1",
        [user.rows[0].customer_id]
      );
      user.rows[0].info = infoUser.rows[0];
    } else if (user.rows[0].role === "employee") {
      const infoUser = await pool.query(
        "SELECT * FROM Employee WHERE id = $1",
        [user.rows[0].employee_id]
      );
      user.rows[0].info = infoUser.rows[0];
    } else if (user.rows[0].role === "admin") {
      const infoUser = await pool.query(
        "SELECT * FROM Employee WHERE id = $1",
        [user.rows[0].employee_id]
      );
      user.rows[0].info = infoUser.rows[0];
    }

    console.log(user.rows[0]);

    if (user.rows.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!validPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid password",
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
    res.status(400).json({
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
