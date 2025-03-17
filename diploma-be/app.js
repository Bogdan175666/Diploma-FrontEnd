const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const clientRoutes = require('./routes/client-routes');
const devRoutes = require('./routes/dev-routes');

const app = express();

app.use(bodyParser.json());
const url = process.env.MONGO_URI;

app.use('/api/clients', clientRoutes);
app.use('/api/devs', devRoutes);

mongoose
    .connect(url)
    .then(() => {
        app.listen(4200);
    })
    .catch(err => {
        console.log(err);
    });
