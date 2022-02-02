const { response } = require('express');
const express = require('express');
const router = express.Router();
var fs = require('fs');
const axios = require('axios');
const request = require('request');
//import fetch from "node-fetch";

//const json = require('../../productsTest.json')
//const json = require('/Cloud Native Apps/shipping-API/productsTest.json')
//const url = 'https://fakestoreapi.com/products/1'
//'https://www.cards.com/inventory/{productId}/{quantity}'

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

    //sendEmail(email)

    res.sendStatus(200);

    //return
    /*axios.post(
        'https://cna-email-fw-teaching.rahtiapp.fi/sendmail', {
        to: email, 
        subject: "Test mail Newest", 
        body: "Your order has been Shipped" 
        }); */
        //console.log(await sendEmail(email));
        //await sendEmail();

        
        
        /*json({
            message:'This is a Shipping Service'
        });*




    
    /*request.get({
        url: 'https://fakestoreapi.com/products/1',
        method: 'GET',
        message: 'Test'
    },async(err, response, body) =>{
        status = await response.statusCode;
        //console.log(response.statusCode)
    });
    console.log(status); */
    //console.log(status);
})

async function storageCaller(){
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


/*router.get('/listUsers', (req, res) => {
    fs.readFile(data, 'utf8',(err, data) =>{
       console.log(err);
       console.log(data);
       res.end(data); 
    }); 
    res.status(200).json({
        message: "Test"  
    });
 });

 router.patch('/:productId', (req,res) => {

    
    id = id = req.params.productId;
    quantity = req.params.quantity;
    console.log(id);

    try {
        test[id] = req.body
        res.status(200).json({
            message: 'Product ' + id + 'updated' 
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
    
 })

 

 router.patch('/:id/:quantity', function (req, res) {

    axios.post(
        'https://cna-email-fw-teaching.rahtiapp.fi/sendmail', {
        to: "eklofcas@arcada.fi", 
        subject: "Test mail Newest", 
        body: "Testmail message" 
        });

    const id = req.params.id;
    const quant = req.params.quantity;
 
    fs.readFile('/Cloud Native Apps/shipping-API/productsTest.json', 'utf8', function (err, data) {
       data = JSON.parse( data );
       console.log(data)

 
       data[id].stock -= quant;
 
       res.end( JSON.stringify(data));
 
       fs.writeFile('/Cloud Native Apps/shipping-API/productsTest.json', JSON.stringify(data), function (err) {
         if(err){return console.log(err);}
       });
    });
 })


router.delete('/:productId/:quantity', (req,res) =>{
    id = id = req.params.productId;
    quantity = req.params.quantity
    db = "database";
    //console.log(json);
    //console.log(json['product1']);
    //delete json['product1']
    //console.log(json);
    fs.readFile('/Cloud Native Apps/shipping-API/productsTest.json', 'utf8', function (err, data) {
        //console.log(__dirname);
        data = JSON.parse( data );

        console.log(data.product1.stock - quantity)
        delete data["product" + id.stock - quantity];
        //delete data[data.pr;
        res.end( JSON.stringify(data));
  
        fs.writeFile('/Cloud Native Apps/shipping-API/productsTest.json', JSON.stringify(data), function (err) {
          if(err){return console.log(err);}
        });
     });
    //delete json[1];
    //console.log(json);
    res.status(200).json({
        message: 'product id ' + id + ' deleted from ' + db,
        quantity: quantity
    });
});

/*router.delete('/:id', function (req, res){
    // First read existing users.
    fs.readFile( __dirname + "/" + "productsTest.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["product" + req.params.id];
 
       console.log( data );
       res.end( JSON.stringify(data));

       fs.writeFile('products.json', JSON.stringify(data), function (err) {
         if(err){return console.log(err);}
       });
    });
 }) */

 /*async function fetchData() {
    const url = 'https://fakestoreapi.com/products/1'
    const response = await fetch(url);
    jsonTest = await response.json();
    console.log(jsonTest);
    console.log(JSON.stringify(jsonTest))
    splitData(JSON.stringify(jsonTest))

 }
 
 async function splitData(data){
    test = data.split(',')
    console.log(test[1])
 } */
 




module.exports = router;
