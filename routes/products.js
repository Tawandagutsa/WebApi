const express = require('express');
const router = express.Router();
const firebase =  require('../config/firebase-config')

var database = firebase.database();

router.post(`/`, async (req,res) =>{
    const product = {
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
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

router.get(`/`, async (req,res)=>{

    database.ref('restaurant1/products').get().then((prods)=>{
        res.send(prods);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    })
});    
});


router.delete(`/:id`, async (req, res)=> {
    
    database.ref('restaurant1/products').child(req.params.id).remove().then((product)=>{
        res.status(200).send({
            success: true,
            message: "Product successfully deleted"
        })
    })
    .catch((err)=>{
        res.send({success: false,
        message: err
        });
    })
});

module.exports = router;