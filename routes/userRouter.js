const express = require('express');

const router = express.Router();

const registerController = require('../controller/registerController');

const authController = require('../controller/authController');

const roomController = require('../controller/roomController');

const reservationController = require('../controller/reservationController');

const rateLimit = require('../middlewares/rateLimit');

const registerMiddleware = require('../middlewares/registerMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');

const ensureAuthMiddleware = require('../middlewares/ensureAuthMiddleware');

const { validateCreateReservation } = require('../middlewares/reservationMiddleware');

router.post('/register', rateLimit, registerMiddleware, registerController.registerUser);

router.post('/login', rateLimit, authMiddleware, authController.loginUser);

router.get('/rooms', roomController.listActiveRooms);

router.post('/reservations', ensureAuthMiddleware, validateCreateReservation, reservationController.createReservation);

router.get('/reservations/me', ensureAuthMiddleware, reservationController.listMyReservations);

module.exports = router;