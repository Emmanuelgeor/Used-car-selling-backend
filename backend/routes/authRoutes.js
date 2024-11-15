const express = require('express');
const loginController = require('../controllers/Admin/login.controller');
const createAccController = require('../controllers/Admin/CreateAcc.controller');
const updateAccController = require('../controllers/Admin/UpdateAcc.controller');
const suspendAccController = require('../controllers/Admin/SuspendAcc.controller');
const searchAccController = require('../controllers/Admin/SearchAcc.controller');
const createProfileController = require('../controllers/Admin/CreateProfile.controller');
const viewProfileController = require('../controllers/Admin/ViewProfile.controller');
const updateProfileController = require('../controllers/Admin/UpdateProfile.controller');
const searchProfileController = require('../controllers/Admin/SearchProfile.controller');
const suspendProfileController = require('../controllers/Admin/SuspendProfile.controller');
const ProcessLogoutController = require('../controllers/Admin/ProcessLogout.controller');

const router = express.Router();

// User Authentication Routes
router.post('/login', (req, res) => loginController.authenticateUser(req, res));
router.post('/logout', (req, res) => ProcessLogoutController.processLogout(req, res));

// // Account Management Routes
router.post('/create', (req, res) => createAccController.createUser(req, res));
router.put('/update', (req, res) => updateAccController.updateAccount(req, res));
router.put('/suspend',(req, res) => suspendAccController.suspendAccount(req, res));
router.get('/view', (req, res) => ViewAccController.viewAccount(req, res));
router.get('/search', (req, res) => searchAccController.searchAccount(req, res));

// // Profile Management Routes
router.post('/createprofile',(req, res) => createProfileController.createProfile(req, res));
router.get('/viewprofile',(req, res) => viewProfileController.viewProfile(req, res));
router.put('/updateprofile',(req, res) => updateProfileController.updateProfile(req, res));
router.get('/searchprofile',(req, res) => searchProfileController.searchProfile(req, res));
router.put('/suspendprofile',(req, res) => suspendProfileController.suspendProfile(req, res));

module.exports = router;
