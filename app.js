//importing required libraires
const express = require('express');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');
const productsRouter = require('./routes/products');




//configure firebase
var firebaseConfig = {
    apiKey: "AIzaSyDtsa4OJbgCZLrAHt6AcRURvyO3pBHDO7I",
    authDomain: "projectdemo1-53590.firebaseapp.com",
    databaseURL: "https://projectdemo1-53590-default-rtdb.firebaseio.com",
    projectId: "projectdemo1-53590",
    storageBucket: "projectdemo1-53590.appspot.com",
    messagingSenderId: "881023521435",
    appId: "1:881023521435:web:4576cfe4160dae78046c3e",
    measurementId: "G-C995XR59GL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database instance
var database = firebase.database();

const api = process.env.API_URL;

//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.options('*', cors());
app.use(`${api}/restaurant1/products`, productsRouter)

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





app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running on http://localhost:5000")
})

