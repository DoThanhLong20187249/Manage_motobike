const express = require('express');
const moragn = require('morgan');
const app = express();
const customerRouter = require('./router/customerRouter')
const authRouter = require('./router/authRouter')
const employeeRouter = require('./router/employeeRouter')
const motocycleRouter = require('./router/motocycleRouter')
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(moragn('dev'))


app.use('/customer', customerRouter);
app.use('/auth', authRouter)
app.use('/employee',employeeRouter)
app.use('/motocycle', motocycleRouter)





module.exports = app;
