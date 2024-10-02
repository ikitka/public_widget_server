const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const accountController = require('../controllers/accountController');

router.get('/auth', authController.authenticate);
router.get('/admin', adminController.showAdminPage);
router.get('/webhook/disconnect', adminController.disconnectProject);
router.get('/account-info', accountController.getAccountInfo);

module.exports = router;
