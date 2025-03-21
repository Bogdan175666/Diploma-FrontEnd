const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clients-controller');

//POST create the client
router.post('/createClient', clientController.createClient)

module.exports = router;


