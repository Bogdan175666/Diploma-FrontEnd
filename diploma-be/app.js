const express = require('express');
const bodyParser = require('body-parser');

const clientRoutes = require('./routes/client-routes');
const devRoutes = require('./routes/dev-routes');

const app = express();

app.use('/api/clients', clientRoutes);
app.use('/api/devs', devRoutes);

app.listen(4200);
