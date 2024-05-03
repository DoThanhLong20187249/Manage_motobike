const express = require('express');
const moragn = require('morgan');
const app = express();
const customerRouter = require('./router/customerRouter')
const authRouter = require('./router/authRouter')

app.use(express.json());
app.use(moragn('dev'))


app.use('/api/v1/customer', customerRouter);
app.use('/auth', authRouter)



module.exports = app;
