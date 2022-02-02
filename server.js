var express = require('express');
const app = express();
const shippingRoutes = require('./api/routes/shipping');
const emailRoutes = require('./api/routes/email');





const PORT = process.env.PORT || 3030;


/*fetch('https://regres.in/api/users/23').then(res => res.json()).then(data => console.log(data))*/

app.use('/api/shipping', shippingRoutes);
app.use('/email', emailRoutes);
app.get('/test', (req, res) => res.json("Testing"));

app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error, req, res) =>{
   res.status(error.status || 500);
   res.json({
      status: error.status,
       error: error.message
   });
});




var fs = require("fs");

// app.get('/test', (req, res) => res.json("Det funkar!"));

/*app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
}) */


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
