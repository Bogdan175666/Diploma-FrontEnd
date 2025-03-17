const express = require('express');
const {DEVELOPERS} = require("../mocks/devs-db");

const router = express.Router();
const Developer = require('../models/developer')

//GET all the developers
router.get('/', (req, res, next) => {
    res.json({developers: DEVELOPERS});
})

//GET a developer by ID
router.get('/:devId', (req, res, next) => {
    const devId = req.params.devId;
    const developer = DEVELOPERS.find(dev => {
        return dev.id === devId
    })
    res.json({developer: developer})
})

// POST request for creating a dev
router.post('/createDev', async (req, res, next) => {
    console.log(req);
    const {name, skills} = req.body;

    const createdDev = new Developer({
        name,
        skills,
        image: 'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-4.1.0&rect=9%2C0%2C2994%2C1999&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip',
        rating: 0.0
    });

    try {
        await createdDev.save();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    res.status(201).json({developer: createdDev});
})

module.exports = router;
