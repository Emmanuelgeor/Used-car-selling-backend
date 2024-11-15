const express = require('express');

const viewUsedCarController = require('../controllers/CarAgent/viewUsedCar.controller');
const updateUsedCarController = require('../controllers/CarAgent/updateUsedCar.controller');
const suspendUsedCarController = require('../controllers/CarAgent/suspendUsedCar.controller');
const searchUsedCarController = require('../controllers/CarAgent/searchUsedCar.controller');
const viewRatingsController = require('../controllers/CarAgent/viewRatings.controller');
const loginCarAgentController = require('../controllers/CarAgent/loginCarAgent.controller');
const logoutCarAgentController = require('../controllers/CarAgent/logoutCarAgent.controller');
const giveRatingController = require('../controllers/CarAgent/viewRatings.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// CarAgent Authentication Routes
router.post('/logincaragent', (req, res) => loginCarAgentController.authenticateUser(req, res));
router.post('/logout', (req, res) => logoutCarAgentController.processLogout(req, res));

// Used Car Management Routes
router.post('/create', authMiddleware, (req, res) => createUsedCarController.createUsedCar(req, res));
router.get('/view/:id', authMiddleware, (req, res) => viewUsedCarController.viewUsedCar(req, res));
router.put('/update', authMiddleware, (req, res) => updateUsedCarController.updateUsedCar(req, res));

router.get('/search', authMiddleware, (req, res) => searchUsedCarController.searchUsedCar(req, res));
router.post('viewratings',(req, res) => viewRatingsController.viewRating(req, res));

module.exports = router;
