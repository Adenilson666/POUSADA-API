const express = require('express');

const router = express.Router();

const registerController = require('../controller/registerController');

const authController = require('../controller/authController');

const roomController = require('../controller/roomController');

const rateLimit = require('../middlewares/rateLimit');

const registerMiddleware = require('../middlewares/registerMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', rateLimit, registerMiddleware, registerController.registerUser);

router.post('/login', rateLimit, authMiddleware, authController.loginUser);

router.get('/rooms', roomController.listActiveRooms);

module.exports = router;