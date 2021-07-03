//importing required libraires
const express = require('express');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');




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


//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.options('*', cors());

//environment variables 
const api = process.env.API_URL;



app.post(`${api}/restaurant1/products/`, async (req,res) =>{
    const product = {
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        isFavorite: req.body.isFavorite,
        title: req.body.title,
        eTimeToPrepare: req.body.eTimeToPrepare,
        category: req.body.category,
    }

   database.ref('restaurant1/products').push(product).then((product)=>{
        res.status(200).send({
            success: true,
            message: "Product successfullly created."
        });

    }).catch((error)=>{
        res.send({
            success: false,
            message: error
        })
    })
    
})

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

// app.get(`${api}/restaurant1/categories/:category`, async (req,res)=>{

//     await database.ref('restaurant1/products').orderByChild("category").equalTo("drinks").on("value", snapshot =>{
//         products = snapshot.val();
//     });
  
//     res.send(products);
// })




app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})
