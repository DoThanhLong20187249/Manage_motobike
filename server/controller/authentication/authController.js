const pool = require("../../db").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, phone, address, email, password} = req.body;
  const role = 'customer';

  try {
    const exitingUser = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
    if (exitingUser.rows.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO Users (email, password, role) VALUES ($1, $2, $3) RETURNING id',[email, hashedPassword, role]
    );

    const userId = newUser.rows[0].id
    console.log(typeof userId)
    if (role === 'customer') {
      await pool.query(
        'INSERT INTO Customer (name, phone, address,user_id) VALUES ($1, $2, $3, $4)',
        [name, phone, address,userId]
      );
    }

    res.status(201).json({
      status: "success",
      message: "User has been registered",
      data: newUser.rows
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      req.body.email,
    ]);

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
      const token = jwt.sign(
        {
          id: user.rows[0].id,
          role: user.rows[0].role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        status: "success",
        message: "User has been logged in",
        data: {...data, token}
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
