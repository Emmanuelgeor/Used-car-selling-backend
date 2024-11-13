const express = require('express');
const loginSellerController = require('../controllers/Seller/loginSeller.controller');
const logoutSellerController = require('../controllers/Seller/logoutSeller.controller');
const trackViewController = require('../controllers/Seller/trackView.controller');
const trackShortlistController = require('../controllers/Seller/trackShortlist.controller');
const rateAgentController = require('../controllers/Seller/rateAgent.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Seller Authentication Routes
router.post('/login', (req, res) => loginSellerController.login(req, res));
router.post('/logout', (req, res) => logoutSellerController.processLogout(req, res));

// Tracking Routes
router.get('/track/view/:sellerId/:carId', authMiddleware, (req, res) => trackViewController.trackViews(req, res));
router.get('/track/shortlist/:sellerId/:carId', authMiddleware, (req, res) => trackShortlistController.trackShortlist(req, res));

// Rate Agent Route
router.post('/agent/rate', authMiddleware, (req, res) => rateAgentController.rateAgent(req, res));

module.exports = router;
