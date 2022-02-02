var express = require('express');
const app = express();
const shippingRoutes = require('./api/routes/shipping');
const PORT = process.env.PORT || 3030;

app.use('/api/shipping', shippingRoutes);
app.get('/', (req, res) => res.json({
   message: "This is a Shipping Service",
   status: '200'
}));

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); 
