var express = require('express');
const app = express();
const shippingRoutes = require('./api/routes/shipping');
const PORT = process.env.PORT || 3030;

app.use('/api/shipping', shippingRoutes);
app.get('/', (req, res) => res.json({
   message: "This is a Shipping Service",
   status: res.statusCode,
   httpMethods: {
      postJSON: "/api/shipping/reduce/product",
      postQueryParams: "/api/shipping/reduce",
      tokenRequired: true
   }
}));
// Middelware that checks if routes can't handle the request
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   res.status(404).json({
      error: error.message,
      status: error.status,
      methods: 
      {
         postJSON: "/api/shipping/reduce/product",
         postQueryParams: "/api/shipping/reduce",
         tokenRequired: true
      }
   });
   next(error);
});
// Error handling for any other error
app.use((error, req, res) =>{
   res.status(error.status || 500);
   res.json({
       error: error.message
   });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); 
