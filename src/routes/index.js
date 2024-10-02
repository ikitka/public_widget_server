const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const accountController = require('../controllers/accountController');
const privacyController = require('../controllers/privacyController');
const authMiddleware = require('../middleware/auth');

router.get('/auth', authController.authenticate);
router.get('/admin', authMiddleware, adminController.showAdminPage);
router.get('/webhook/disconnect', adminController.disconnectProject);
router.get('/account-info', accountController.getAccountInfo);
router.get('/privacy', privacyController.getPrivacy);


module.exports = router;
