const express = require('express');
const router = express.Router();
const { Paynow } = require('paynow');
const { route } = require('./promotions');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
};

let paynow = new Paynow("11326", "95ae25f9-b11f-4ad6-8b6e-e9e42838418c");

//Ecocash
router.post(`/ecocash`, async (req,res)=>{
    let transaction = {
        user: req.body.user,
        items: req.body.items,
        amount: req.body.amount,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    let payment = paynow.createPayment("Invoice 37", transaction.email);

    payment.add("Title", transaction.amount);

    paynow.sendMobile(payment, transaction.phoneNumber, 'ecocash').then(async response => {
        if(response.success) {
            res.send(response);
            await sleep(30000);

            let status = await paynow.pollTransaction(response.pollUrl);
            console.log(status.status);
            //logic to update status on db
        }
    
    });

});


//Onemoney
router.post(`/onemoney`, async (req,res)=>{
    let transaction = {
        user: req.body.user,
        items: req.body.items,
        amount: req.body.amount,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }
    let payment = paynow.createPayment("Invoice 37", transaction.email);

    payment.add("Title", transaction.amount);

    paynow.sendMobile(payment, transaction.phoneNumber, 'onemoney').then(async response => {
     res.send(response);
     if(response.success) {
        res.send(response);
        await sleep(30000);

        let status = await paynow.pollTransaction(response.pollUrl);
        console.log(status.status);
        //logic to update status on db
    }
  });

});


router.post(`/pollurl`, async(req,res)=>{
    let pollurl = req.body.url;
    let status = paynow.pollTransaction(pollurl);
    res.send({
        status: (await status).status,
        message: (await status).error!=null ? (await status).error : "null"
    })
});


module.exports = router;