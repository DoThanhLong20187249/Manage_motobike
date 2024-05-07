const pool = require("../../db").pool;
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  const { name, phone, address, email, password } = req.body;
  const role = "employee";

  try {
    const exitingUser = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
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

    const newUser = await pool.query(
      "INSERT INTO Users (email, password, role) VALUES ($1, $2, $3) RETURNING id",
      [email, hashedPassword, role]
    );

    const userId = newUser.rows[0].id;
    if (role === "customer") {
      await pool.query(
        "INSERT INTO Customer (name, phone, address,user_id) VALUES ($1, $2, $3, $4)",
        [name, phone, address, userId]
      );
      // } else if (role === "employee") {
      //   await pool.query(
      //     "INSERT INTO Employee (name, phone, address,position, user_id) VALUES ($1, $2, $3, $4)",
      //     [name, phone, address, userId]
      //   );
    }

    res.status(201).json({
      status: "success",
      message: "User has been registered",
      data: newUser.rows,
    });
  } catch (err) {
    res.status(400).json({
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
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      req.body.email,
    ]);
    if (user.rows[0].role === "customer") {
      const infoUser = await pool.query("SELECT * FROM Customer WHERE user_id = $1", [user.rows[0].id]);
      user.rows[0].info = infoUser.rows[0];
    } else if (user.rows[0].role === "employee") {
      const infoUser = await pool.query("SELECT * FROM Employee WHERE user_id = $1", [user.rows[0].id]);
      user.rows[0].info = infoUser.rows[0];
    } else if (user.rows[0].role === "admin") {
      const infoUser = await pool.query("SELECT * FROM Employee WHERE user_id = $1", [user.rows[0].id]);
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
      res.status(200).json({ ...data, token }
      );
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
    res.cookie("refreshToken", newRefreshToken, { // set new refresh token
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
}

module.exports = {
  registerUser,
  loginUser,
  requestRefreshToken,
  userLogout
};
