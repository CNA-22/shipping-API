const { response } = require('express');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var config = require('../../config')
require('dotenv').config();

// Token and Urls for Apis
const token = process.env.AUTH_TOKEN;
const inventoryService = process.env.INVENTORY_SERVICE;
const userService = process.env.USER_SERVICE;
const emailService = process.env.EMAIL_SERVICE;


/*
    --------------------------------------------------
    
    TODO LIST:
    - storageCaller() function --> use commented code when inventory service is functional and doesn't chrash
    - Check email service --> no mail sent even though response is 200 --> email filter?
    - Update README
    
    --------------------------------------------------

*/

router.use(bodyParser.json());

// Access Control Allow Any Origin
router.use(cors());

// Endpoint with query parameters
router.post('/reduce', async (req,res) =>{
    id = req.query.id;
    quantity = req.query.quantity;
    email = req.query.email;
    let authHeader = req.headers['authorization'];
    apiFunction(id, quantity, email, authHeader, res);
});

// Storage Caller function
async function storageCaller(id, quantity, authHeader){
    const options = {
        headers: {'Content-Type': 'application/json',  'Authorization': authHeader}
    }
    //Add correct API here 
    //TEST
    let res = await axios.get('https://fakestoreapi.com/products/1');
    //INVENTORY API
    // Borde vara post men inventeroy apin kan patchas direkt ¯\_(ツ)_/¯
    /*let res = await axios.patch(`${inventoryService}`+id, {
        pid: id,
        //Inventory api patch endpoint requires pris
        pris: '0',
        antal: quantity
    }, options); */
    return res.status;
}    

//Send Email function
async function sendEmail(email, authHeader){
    //login()
    const options = {
        headers: {'Content-Type': 'application/json',  'Authorization': authHeader /*`Bearer ${token}` */}
    }
    let res = await axios.post(`${emailService}`, {
        to: email, 
        subject: "Test mail Newest", 
        body: "Testmail message" 
        }, options);

    return res.status;
}

async function apiFunction(id, quantity, email, authHeader, res) {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'});
    }
    try {
        jwt.verify(token,config.secret);
        
    } catch (error) {
        return res.status(500).send({ 
            auth: false, 
            message: 'Failed to authenticate token.' });   
    }

    if(id == null || quantity == null || email == null) {
        return res.status(400).json({
            status: res.statusCode,
            message: 'Id, Quantity or Product Name is missing'
        });
    }
    else if(!(quantity > 0)) {
       
        return res.status(400).json({
            status: res.statusCode,
            message: 'Quantity must be a number over 0'
        });
    }
    let storageStatus = await storageCaller(id, quantity, authHeader);

    if(storageStatus == 404){
        return res.status(404).json({
            status: res.statusCode,
            message: 'ProductId not Found'
        });
    }
    else if(storageStatus == 403){
        return res.status(403).json({
            status: res.statusCode,
            message: 'Not Enough Products to reduce'
        });
    }
    else if (storageStatus != 200) {
        return res.status(501).json({
            status: res.statusCode,
            message: 'The server does not support the functionality required to fulfill the request'
        })
    }
    let emailStatus = await sendEmail(email, authHeader);
    let emailSent;
    let message;

    if (emailStatus != 200) {
        emailSent = false;
        message = 'Package was successfully shipped but email confirmation could not be sent to ' + email;
    }
    else {
        emailSent = true;
        message = 'Package was succesfully shipped and email confirmation was sent to ' + email;
    }

    res.json({
       message: message,
       status: res.statusCode,
       shippingStatus: 'Shippment was sent to ' + email,
       emailSent: emailSent,
       quantity: quantity,
       id: id
    });
}
// JSON Body Endpoint
router.post('/reduce/product', async(req,res) =>{
    id = req.body.id;
    quantity = req.body.quantity;
    email = req.body.email;
    let authHeader = req.headers['authorization'];

    apiFunction(id, quantity, email, authHeader, res);
});

router.get('/', (req,res) =>{
    res.json({
        message:'This is a Shipping Service',
    });
});

module.exports = router;
