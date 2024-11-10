const express = require('express');
const router = express.Router();

const adminc = require('../controllers/adminc');
const agentc = require('../controllers/agentc');
const buyerc = require('../controllers/buyerc');
const sellerc = require('../controllers/sellerc');

router.post('/admin/login', adminc.login); 
router.post('/agent/login', agentc.usedcarI); 
router.post('/buyer/login', buyerc.buyerI); 
router.post('/seller/login', sellerc.sellerI); 

module.exports = router;