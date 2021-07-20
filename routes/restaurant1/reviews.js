const express = require('express');
const router = express.Router();
const firebase =  require('../../config/firebase-config');

var database = firebase.database();

router.get(`/all`, (req,res)=>{
    let reviews = [];
    
    database.ref(`/users`).get().then((users)=>{
        userList = users.val();
        Object.keys(userList).forEach(function(key){
            if(userList[key].reviews!=null){
                reviews.push(userList[key].reviews);
            }
        });
        if(reviews.length==0){
            res.send({
                message:"No reviews"
            });
        }else{
            res.send(reviews);
        }
    })
    .catch((err)=>{
        res.send({
            success: false,
            message: err
    });
});    

});

module.exports = router;