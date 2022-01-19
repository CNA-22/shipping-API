var express = require('express');
const app = express();
const inventoryRoutes = require('./api/routes/inventory');
const emailRoutes = require('./api/routes/email');

const PORT = process.env.PORT || 3030;




app.use('/inventory', inventoryRoutes);
app.use('/email', emailRoutes);
app.get('/test', (req, res) => res.json("Testing"));




var fs = require("fs");

// app.get('/test', (req, res) => res.json("Det funkar!"));

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

/*app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
 
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 app.delete('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "productsTest.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["product" + req.params.id];

      console.log( data );
      res.end( JSON.stringify(data));

      fs.writeFile('/productsTest.json', JSON.stringify(data), function (err) {
        if(err){return console.log(err);}
      });
   });
}) */

 

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); 
