const addNewOrder = async (req, res) => {
    const data = req.body
    console.log(req.params)
    console.log(data)
}

module.exports = {
    addNewOrder
}