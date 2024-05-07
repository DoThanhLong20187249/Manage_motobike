const pool = require("../db").pool;

const getAllAccount = (req, res) => {
    pool.query("SELECT * FROM Users", (err, result) => {
        if (err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
        }
        res.status(200).json({
        status: "success",
        message: "Get All Account",
        data: result.rows,
        });
    });
};

const getAccountById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        "SELECT * FROM Users WHERE id = $1",
        [id],
        (err, result) => {
            if (err) {
            res.status(400).json({
                status: "failed",
                message: err.message,
            });
            }
            res.status(200).json({
            status: "success",
            message: "Get Account By Id",
            data: result.rows,
            });
        }
    );
}



module.exports = {
    getAllAccount,
    getAccountById,
}