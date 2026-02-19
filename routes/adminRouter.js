const express = require('express');

const router = express.Router();

const adminController = require('../controller/adminController');

const roomController = require('../controller/roomController');

const reservationController = require('../controller/reservationController');

const ensureAuthMiddleware = require('../middlewares/ensureAuthMiddleware');

const ensureAdminMiddleware = require('../middlewares/ensureAdminMiddleware');

const { validateCreateRoom, validateUpdateRoom} = require('../middlewares/roomMiddleware');

const { validateCancelReservation } = require('../middlewares/reservationMiddleware');

router.get('/admin/users', ensureAuthMiddleware, ensureAdminMiddleware, adminController.listUsers);

router.get('/admin/rooms', ensureAuthMiddleware, ensureAdminMiddleware, roomController.listAllRooms);

router.post('/admin/rooms', ensureAuthMiddleware, ensureAdminMiddleware, validateCreateRoom, roomController.createRoom);

router.patch('/admin/rooms/:id', ensureAuthMiddleware, ensureAdminMiddleware, validateUpdateRoom, roomController.updateRoom);

router.delete('/admin/rooms/:id', ensureAuthMiddleware, ensureAdminMiddleware, roomController.deactivateRoom);

router.get('/admin/reservations', ensureAuthMiddleware, ensureAdminMiddleware, reservationController.listAllReservations);

router.patch('/admin/reservations/:id', ensureAuthMiddleware, ensureAdminMiddleware, validateCancelReservation, reservationController.cancelReservation);

module.exports = router;