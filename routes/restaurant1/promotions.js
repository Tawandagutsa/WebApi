const express = require('express');
const router = express.Router();
const firebase =  require('../../config/firebase-config');

var database = firebase.database();

//create promotion
router.post(`/create`, async (req,res) =>{

    const promotion = {
        
        promoName: req.body.promoName,
        description: req.body.description
    };

    database.ref('restaurant1/promotions').push(promotion).then((promotion=>{
        res.status(200).send({
            success: true,
            message: "Promotion successfully created."
        });
    })).catch((error)=>{
        res.send({
            success: false,
            message: error
        });
    });
    
});

//delete promotion
router.get(`/`, async (req,res)=>{
    database.ref('restaurant1/promotions').get().then((promotions)=>{
        res.send(promotions);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
  });    
});

module.exports = router;