require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const routes = require('./src/routes');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'hbs');

// Static files (CSS, JS)
app.use(express.static('public'));

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
