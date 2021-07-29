const express = require('express');
const router = express.Router();
const firebase =  require('../../config/firebase-config')

var database = firebase.database();

function removeDuplicates(originalList,prop){
    var newList = {};
    var lookupObject = {};
    for(var i in originalList){
        lookupObject[originalList[i][prop]] = originalList[i];
    }
    for(i in lookupObject){
        newList[i] = lookupObject[i];
    }
    return newList
}

//Create new product
router.post(`/create`, async (req,res) =>{
    let product = {
        description: req.body.description,
        title: req.body.title,
        category: req.body.category,
        eTimeToPrepare: req.body.eTimeToPrepare,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        imagePath: req.body.imagePath,
        quantity: req.body.quantity
    };

   database.ref('restaurant1/products').push(product).then((product)=>{
        res.status(200).send({
            success: true,
            message: "Product successfullly created."
        });

    }).catch((error)=>{
        res.send({
            success: false,
            message: error
        });
    });
    
});

//get all products
router.get(`/`, async (req,res)=>{

    database.ref('restaurant1/products').get().then((prods)=>{
        res.send(prods);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
  });    
});


//get product category/filter
router.get(`/categories/:category`, async (req,res)=>{
    let category = [];
    database.ref('restaurant1/products').get().then((prods)=>{
        products = prods.val();
        Object.keys(products).forEach(function(key){
            if(products[key].category==req.params.category){
                category.push(products[key]);
            };
          });
        res.send(category);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
  });    
});




//get categories 
router.get(`/categories/`, async (req,res)=>{
    let category = [];
    database.ref('restaurant1/products').get().then((prods)=>{
        products = prods.val();
        Object.keys(products).forEach(function(key){
            if(products[key].category!=null){
                category.push({
                  "category":  products[key].category,
                  "imagePath": products[key].imagePath
                 });
            };
          });
        category = removeDuplicates(category,"category");
        res.send(category);
    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
  });    
});





//delete product
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