const { response } = require('express');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
const axios = require('axios');
const { append, sendStatus } = require('express/lib/response');
const e = require('express');
const { quiet } = require('nodemon/lib/utils');
const res = require('express/lib/response');

router.use(bodyParser.json());

router.post('/reduce', async (req,res) =>{
    //console.log('1',req.headers)
    //console.log('2',req.query)

    jsonBody = req.body;
    console.log(req.body);
    
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

async function storageCaller(id, quantity){
    //Add correct API here 
    //TEST
    let res = await axios.get('https://fakestoreapi.com/products/1')
    //INVENTORY API
    // Borde vara post men inventeroy apin kan patchas direkt ¯\_(ツ)_/¯
    /*let res = await axios.patch('https://cna-inventory-service.herokuapp.com/products/'+id, {
        sku: id,
        pris: '10',
        antal: quantity
    }) */
    console.log('storageCaller check');
    return res.status;
    
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

router.post('/test', async(req,res) =>{
    test = req.body;
    id = req.body.id;
    quantity = req.body.quantity;
    //Get email from db or post json body?
    //Email is not required atm
    email = req.body.email;
    product = req.body.productName

    if(id == null || quantity == null || email == null) {
        res.status(400).json({
            status:'400',
            message: 'Id, Quantity or Email is missing'
        });
    }
    else if(!(quantity > 0)) {
       
        res.status(400).json({
            status:'400',
            message: 'Quantity must be a number over 0'
        });
    }
    let storageStatus = await storageCaller(id, quantity);

    console.log(storageStatus + " 2nd check");

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

    //res.sendStatus(200);
    console.log("Last check");
    res.json({
       message: 'Shippment was succesfully sent',
       shippingStatus: 'Shippment was sent to ' + email,
       quantity: quantity,
       id: id,
       product: product
    });
});



router.get('/', (req,res) =>{
    res.json({
        message:'This is a Shipping Service',
    });
});

module.exports = router;
