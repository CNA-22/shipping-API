const { response } = require('express');
const express = require('express');
const router = express.Router();
var fs = require('fs');
const axios = require('axios');

router.post('/reduce', async (req,res) =>{
    
    id = req.query.id;
    quantity = req.query.quantity;
    email = req.query.email;

    if(id == null || quantity == null) {
        res.status(400).json({
            status:'400',
            message: 'Id or Quantity missing'
        });
    }
    else if(!(quantity > 0)) {
       
        res.status(400).json({
            status:'400',
            message: 'Quantity must be a number over 0'
        });
    }
    let storageStatus = await storageCaller();

    console.log(storageStatus);

    if(storageStatus == 404){
        res.status(404).json({
            status:'404',
            message: 'ProductId not Found'
        });
    }
    else if(storageStatus == 403){
        res.status(403).json({
            status:'403',
            message: 'Not Enough Products to reduce'
        });
    }
    else if (storageStatus != 200) {
        res.status(501).json({
            status: 501,
            message: 'Not Ok'
        })
    }
    //Not working atm
    //sendEmail(email)

    res.sendStatus(200);
})

async function storageCaller(){
    //Add correct API here 
    let res = await axios.get('https://fakestoreapi.com/products/1')
    return res.status;
    //console.log(status);
}

async function sendEmail(email){
    let res = await axios.post(
        'https://cna-email-fw-teaching.rahtiapp.fi/sendmail', {
        to: email, 
        subject: "Test mail Newest", 
        body: "Testmail message" 
        });
    return res.status;
}



router.get('/', (req,res) =>{
    res.json({
        message:'This is a Shipping Service',
    });
});

module.exports = router;
