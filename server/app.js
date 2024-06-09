const express = require('express');
const moragn = require('morgan');
const app = express();
const customerRouter = require('./router/customerRouter')
const authRouter = require('./router/authRouter')
const employeeRouter = require('./router/employeeRouter')
const motocycleRouter = require('./router/motocycleRouter')
const categoryProdcutRouter = require('./router/categoryProductRouter')
const productRouter = require('./router/productRouter')
const categoryIssueRouter = require('./router/categoryIssueRouter')
const checkIssueRouter = require('./router/checkIssueRouter')
const orderRouter = require('./router/orderRouter')

const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(moragn('dev'))


app.use('/customer', customerRouter);
app.use('/auth', authRouter)
app.use('/employee',employeeRouter)
app.use('/motocycle', motocycleRouter)
app.use('/CategoryProduct', categoryProdcutRouter)
app.use('/products', productRouter)
app.use('/categoryIssue', categoryIssueRouter)
app.use('/checkIssue', checkIssueRouter)
app.use('/order', orderRouter)





module.exports = app;
