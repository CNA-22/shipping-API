const { response } = require('express');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
//const { append, sendStatus } = require('express/lib/response');
//const e = require('express');
//const { quiet } = require('nodemon/lib/utils');
//const res = require('express/lib/response');
const token = process.env.AUTH_TOKEN;

router.use(bodyParser.json());

// Access Control Allow Any Origin
router.use(cors());

// Endpoint with query parameters
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
    let storageStatus = await storageCaller(id, quantity);

    //console.log(storageStatus);

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
            message: 'The server does not support the functionality required to fulfill the request'
        })
    }
    //Not working atm
    //sendEmail(email)

    res.json({
        message: 'Shippment was succesfully sent',
        status: res.statusCode,
        shippingStatus: 'Shippment was sent to ' + email,
        quantity: quantity,
        id: id
     });
})

// Storage Caller function
async function storageCaller(id, quantity){
    //Add correct API here 
    //TEST
    let res = await axios.get('https://fakestoreapi.com/products/1')
    //INVENTORY API
    // Borde vara post men inventeroy apin kan patchas direkt ¯\_(ツ)_/¯
    /*let res = await axios.patch('https://cna-inventory-service.herokuapp.com/products/'+id, {
        sku: id,
        //Inventory api patch endpoint requires pris
        pris: '0',
        antal: quantity
    }); */
    console.log('storageCaller check');
    return res.status;
    
}

//Send Email function
async function sendEmail(email){
    const options = {
        headers: {'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`}
    }
    console.log(options);
    let res = await axios.post('https://cna-email-fw-teaching.rahtiapp.fi/sendmail', {
        to: email, 
        subject: "Test mail Newest", 
        body: "Testmail message" 
        }, options);
        console.log(res.status + ' Email Sent Successfully to '+ email);
    return res.status;
}

// JSON Body Endpoint
router.post('/reduce/product', async(req,res) =>{
    id = req.body.id;
    quantity = req.body.quantity;
    //Get email from db or post json body?
    //Email is not required atm
    email = req.body.email;
    product = req.body.productName

    if(id == null || quantity == null || product == null) {
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
            message: 'The server does not support the functionality required to fulfill the request'
        })
    }
    //Not working atm
    sendEmail(email)

    //res.sendStatus(200);
    console.log("Last check");
    res.json({
       message: 'Shippment was succesfully sent',
       status: res.statusCode,
       shippingStatus: 'Shippment was sent to ' + email,
       emailSent: 'true',
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
