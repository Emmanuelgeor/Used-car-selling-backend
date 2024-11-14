const express = require('express');
const loginController = require('../controllers/Admin/login.controller');
const createAccController = require('../controllers/Admin/CreateAcc.controller');
const updateAccController = require('../controllers/Admin/UpdateAcc.controller');
const suspendAccController = require('../controllers/Admin/SuspendAcc.controller');
const searchAccController = require('../controllers/Admin/SearchAcc.controller');
const createProfileController = require('../controllers/Admin/CreateProfile.controller');
const viewProfileController = require('../controllers/Admin/ViewAcc.controller');
const updateProfileController = require('../controllers/Admin/UpdateProfile.controller');
const searchProfileController = require('../controllers/Admin/SearchProfile.controller');
const suspendProfileController = require('../controllers/Admin/SuspendProfile.controller');
const ViewAccController = require('../controllers/Admin/ViewAcc.controller');

const router = express.Router();

// User Authentication Routes
router.post('/login', (req, res) => loginController.authenticateUser(req, res));
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});

// // Account Management Routes
router.post('/create', (req, res) => createAccController.createUser(req, res));
router.put('/update', (req, res) => updateAccController.updateAccount(req, res));
router.put('/suspend',(req, res) => suspendAccController.suspendAccount(req, res));
router.get('/view', (req, res) => ViewAccController.viewAccount(req, res));
router.get('/search', (req, res) => searchAccController.searchAccount(req, res));

// // Profile Management Routes
// router.post('/profile/create', authMiddleware, (req, res) => createProfileController.createProfile(req, res));
// router.get('/profile/view/:id', authMiddleware, (req, res) => viewProfileController.viewProfile(req, res));
// router.put('/profile/update', authMiddleware, (req, res) => updateProfileController.updateProfile(req, res));
// router.get('/profile/search/:name', authMiddleware, (req, res) => searchProfileController.searchProfile(req, res));
// router.put('/profile/suspend/:name', authMiddleware, (req, res) => suspendProfileController.suspendProfile(req, res));

// // Example of a protected route


module.exports = router;
