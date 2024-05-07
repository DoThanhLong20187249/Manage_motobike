const express = require('express');
const moragn = require('morgan');
const app = express();
const customerRouter = require('./router/customerRouter')
const authRouter = require('./router/authRouter')
const accountRouter = require('./router/accountRouter')
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(moragn('dev'))


app.use('/api/v1/customer', customerRouter);
app.use('/auth', authRouter)
app.use('/account',accountRouter)



module.exports = app;
