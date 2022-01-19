const express = require('express');
const router = express.Router();
var fs = require('fs');
const json = require('../../productsTest.json')
//const json = require('/Cloud Native Apps/shipping-API/productsTest.json')

router.get('/', (req,res) =>{
    
    res.status(200).json({
        id: '1',
        product: "Test",
        quantity: "1"
    });
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

router.delete('/:productId', (req,res) =>{
    id = id = req.params.productId;
    db = "database";
    //console.log(json);
    //console.log(json['product1']);
    //delete json['product1']
    //console.log(json);
    fs.readFile('/Cloud Native Apps/shipping-API/productsTest.json', 'utf8', function (err, data) {
        console.log(__dirname);
        data = JSON.parse( data );
        //delete data["product" + req.params.productId];
  
        console.log(data);
        res.end( JSON.stringify(data));
  
        fs.writeFile('/Cloud Native Apps/shipping-API/productsTest.json', JSON.stringify(data), function (err) {
          if(err){return console.log(err);}
        });
     });
    //delete json[1];
    //console.log(json);
    res.status(200).json({
        message: 'product id ' + id + ' deleted from ' + db,
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

 




module.exports = router;
