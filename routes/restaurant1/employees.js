const express = require('express');
const router = express.Router();
const firebase =  require('../../config/firebase-config')

var database = firebase.database();


//create employee
router.post(`/create`, (req,res) =>{
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
    });

});


//get all employees
router.get(`/`, async (req,res)=>{

    database.ref('restaurant1/employees').get().then((employees)=>{
        res.send(employees);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
});    
});

//delete employee
router.delete(`/:id`, async (req, res)=> {
    
    database.ref('restaurant1/employees').child(req.params.id).remove().then((product)=>{
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

module.exports = router;