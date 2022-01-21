const { response } = require('express');
const express = require('express');
const router = express.Router();
var fs = require('fs');
const fetch = require('node-fetch');
//const test = require('node-fetch')
//import fetch from "node-fetch";

const json = require('../../productsTest.json')
//const json = require('/Cloud Native Apps/shipping-API/productsTest.json')
const url = 'https://fakestoreapi.com/products/1'
//'https://www.cards.com/inventory/{productId}/{quantity}'

const test = [
    {message: 'Test1'},
    {message: 'Test2'}
]

router.get('/', (req,res) =>{
    //fetchData()
    res.send(test)
    
    /*res.status(200).json({
        id: '1',
        product: "Test",
        quantity: "1"
    }); */
});


router.get('/listUsers', (req, res) => {
    /*fs.readFile(data, 'utf8',(err, data) =>{
       console.log(err);
       console.log(data);
       res.end(data); 
    }); */
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

 async function fetchData() {

    fetch(url).then(res => res.json()).then(data => console.log(data))
     /*let response = await fetch('/Cloud Native Apps/shipping-API/productsTest.json')
     let data = await response.text()
     console.log(data) */
 }
 




module.exports = router;
