//importing required libraires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');
const productsRouter = require('./routes/restaurant1/products');
const paymentRouter = require('./routes/restaurant1/payment');
const employeeRouter = require('./routes/restaurant1/employees');
const promotionRouter = require('./routes/restaurant1/promotions');
const firebase = require('./config/firebase-config');

//environment variables
const api = process.env.API_URL;

//database instance
var database = firebase.database();


//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.options('*', cors());
app.use(`${api}/restaurant1/products`, productsRouter);
app.use(`${api}/restaurant1/employees`, employeeRouter);
app.use(`${api}/restaurant1/promotions`, promotionRouter);
app.use(`${api}/pay`, paymentRouter);


app.get(`/`, async (req,res)=>{
    res.send("HELLO FIFTH API")
});


app.listen(process.env.PORT || 4001, ()=>{
    console.log("Server is running on http://localhost:4001")
});

module.exports = database;