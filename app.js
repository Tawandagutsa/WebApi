//importing required libraires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');
const productsRouter = require('./routes/products');
const firebase = require('./config/firebase-config');



//database instance
var database = firebase.database();

const api = process.env.API_URL;

//middleware 
app.use(`${api}/restaurant1/products`, productsRouter)
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.options('*', cors());

//environment variables 

app.get(`/`, async (req,res)=>{

    res.send("HELLO FIFTH API")
    
});





app.post(`${api}/restaurant1/employees/`, (req,res) =>{
    const employee = {
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
    }
    database.ref('restaurant1/employees').push(employee).then((employee)=>{
        res.status(200).send({
            success: true,
            message: "Employee account successfully created."
        });
    }).catch((error)=>{
        res.send({
        success: false,
        message: error
        });
    })

})

app.post(`${api}/restaurant1/promotions/`, async (req,res) =>{
    const promotion = {
        promoName: req.body.promoName,
        description: req.body.description
    }
    database.ref('restaurant1/promotions').push(promotion).then((promotion=>{
        res.status(200).send({
            success: true,
            message: "Promotion successfully created."
        });
    })).catch((error)=>{
        res.send({
            success: false,
            message: error
        })
    })
    
})


app.get(`${api}/restaurant1/employees/`, async (req,res)=>{

    database.ref('restaurant1/employees').get().then((employees)=>{
        res.send(employees);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    })
});    
})
 

app.delete(`${api}/restaurant1/employees/:id`, async (req, res)=> {
    
    database.ref('restaurant1/employees').child(req.params.id).remove().then((employee)=>{
        res.status(200).send({
            success: true,
            message: "User successfully deleted"
        })
    })
    .catch((err)=>{
        res.send({success: false,
        message: err
        });
    })
});





app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})

module.exports = database;