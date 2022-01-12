var express = require('express');
const app = express();
const inventoryRoutes = require('./api/routes/inventory');
const emailRoutes = require('./api/routes/email');

const PORT = process.env.PORT || 3030;


app.use('/inventory', inventoryRoutes);
app.use('/email', emailRoutes);

app.get('/test', (req, res) => res.json("Testing"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
