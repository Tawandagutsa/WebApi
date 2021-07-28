const express = require('express');
const router = express.Router();
const firebase =  require('../../config/firebase-config')

var database = firebase.database();

//create user 
router.post(`/create`, (req,res)=>{
    let user = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: "user",
    };

    database.ref('/users').push(user).then((user)=>{
        res.status(200).send({
            success: true,
            message: "User successfully created"
        });

    }).catch((error)=>{
        res.send({
            success: false,
            message:error
        });
    });

});


//get all employees
router.get(`/`, async (req,res)=>{

    database.ref('/users').get().then((users)=>{
        res.send(users);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
});    
});

//delete user
router.delete(`/:id`, async (req, res)=> {
    
    database.ref('/users').child(req.params.id).remove().then((user)=>{
        res.status(200).send({
            success: true,
            message: "User successfully deleted"
        })
    })
    .catch((err)=>{
        res.send({success: false,
        message: err
        });
    });
});


//create review 
router.post(`/review/post/:uid`, (req,res)=>{
    let review = {
        restaurant: req.body.restaurant,
        stars: req.body.stars,
        description: req.body.description,
    };

    database.ref(`/users/${req.params.uid}/reviews`).push(review).then((_)=>{
        res.status(200).send({
            success: true,
            message: "Review successfully created"
        });

    }).catch((error)=>{
        res.send({
            success: false,
            message:error
        });
    });

});


//get reviews
router.get(`/review/get/:uid`, async (req,res)=>{

    database.ref(`/users/${req.params.uid}/reviews`).get().then((reviews)=>{
        res.send(reviews);

    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
  });    
});


//delete review
router.delete(`/review/delete/:uid/:rid`, async (req, res)=> {
    
    database.ref(`/users/${req.params.uid}/reviews`).child(req.params.rid).remove().then((_)=>{
        res.status(200).send({
            success: true,
            message: "Review successfully deleted"
        })
    })
    .catch((err)=>{
        res.send({success: false,
        message: err
        });
    });
});



module.exports = router;
