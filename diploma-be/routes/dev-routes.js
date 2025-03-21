const express = require('express');
const router = express.Router();

const developerController = require('../controllers/developers-controller')


//GET all the developers
router.get('/', developerController.getDevelopers)

//GET a developer by ID
router.get('/:devId', developerController.getDeveloperById)

// POST request for creating a dev
router.post('/createDev', developerController.createDeveloper)

//PATCH request for updating skills using dev id
router.patch('/:devId/skills', developerController.updateDeveloperSkills)

//DELETE request for deleting a dev by id
router.delete('/:devId', developerController.deleteDeveloper);

module.exports = router;
