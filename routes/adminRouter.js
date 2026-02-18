const express = require('express');

const router = express.Router();

const adminController = require('../controller/adminController');

const roomController = require('../controller/roomController');

const ensureAuthMiddleware = require('../middlewares/ensureAuthMiddleware');

const ensureAdminMiddleware = require('../middlewares/ensureAdminMiddleware');

const { validateCreateRoom, validateUpdateRoom} = require('../middlewares/roomMiddleware');

router.get('/admin/users', ensureAuthMiddleware, ensureAdminMiddleware, adminController.listUsers);

router.get('/admin/rooms', ensureAuthMiddleware, ensureAdminMiddleware, roomController.listAllRooms);

router.post('/admin/rooms', ensureAuthMiddleware, ensureAdminMiddleware, validateCreateRoom, roomController.createRoom);

router.patch('/admin/rooms/:id', ensureAuthMiddleware, ensureAdminMiddleware, validateUpdateRoom, roomController.updateRoom);

router.delete('/admin/rooms/:id', ensureAuthMiddleware, ensureAdminMiddleware, roomController.deactivateRoom);

module.exports = router;