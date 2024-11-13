const express = require('express');
const loginBuyerController = require('../controllers/Buyer/loginBuyer.controller');
const logoutBuyerController = require('../controllers/Buyer/logoutBuyer.controller');
const shortlistCarController = require('../controllers/Buyer/shortlistCar.controller');
const viewShortlistedCarsController = require('../controllers/Buyer/viewShortlistedCars.controller');
const validateShortlistedCarController = require('../controllers/Buyer/validateShortlistedCar.controller');
const removeShortlistedCarController = require('../controllers/Buyer/removeShortlistedCar.controller');
const loanCalculatorController = require('../controllers/Buyer/loanCalculator.controller');
const rateAgentController = require('../controllers/Buyer/rateAgent.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Buyer Authentication Routes
router.post('/login', (req, res) => loginBuyerController.login(req, res));
router.post('/logout', (req, res) => logoutBuyerController.processLogout(req, res));

// Shortlist Management Routes
router.post('/shortlist', authMiddleware, (req, res) => shortlistCarController.shortlistCar(req, res));
router.get('/shortlist/:buyerId', authMiddleware, (req, res) => viewShortlistedCarsController.viewShortlistedCars(req, res));
router.get('/shortlist/validate/:buyerId/:carId', authMiddleware, (req, res) => validateShortlistedCarController.validateShortlistedCar(req, res));
router.delete('/shortlist/remove', authMiddleware, (req, res) => removeShortlistedCarController.removeShortlistedCar(req, res));

// Loan Calculator Route
router.post('/loan/calculate', authMiddleware, (req, res) => loanCalculatorController.calculateLoan(req, res));

// Rate Agent Route
router.post('/agent/rate', authMiddleware, (req, res) => rateAgentController.rateAgent(req, res));

module.exports = router;
