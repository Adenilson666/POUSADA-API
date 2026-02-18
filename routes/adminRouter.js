const express = require('express');

const router = express.Router();

const adminController = require('../controller/adminController');

const ensureAuthMiddleware = require('../middlewares/ensureAuthMiddleware');

const ensureAdminMiddleware = require('../middlewares/ensureAdminMiddleware');

router.get('/admin/users', ensureAuthMiddleware, ensureAdminMiddleware, adminController.listUsers);

module.exports = router;