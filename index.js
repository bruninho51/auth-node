require('dotenv-safe').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('app/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
consign({ cwd: path.join(__dirname, 'app') })
    .include('database/connection.js')
    .then('database/db.js')
    .then('validators')
    .then('middlewares')
    .then('controllers')
    .into(app);

app.listen(9090, function() {
    console.log('Server running on port 9090.');
});
