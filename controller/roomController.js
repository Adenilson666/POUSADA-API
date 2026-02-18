const roomService = require('../services/roomService');

const createRoom = async (req, res, next) => {
    try {
        const room = await roomService.createRoom(req.body);
        return res.status(201).json(room);
    } catch (error) {
        next(error);
    }
};

const listActiveRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.listActiveRooms();
        return res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

const listAllRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.listAllRooms();
        return res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

const getRoomById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.getRoomById(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

const updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.updateRoom(id, req.body);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

const deactivateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.deactivateRoom(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRoom,
    listActiveRooms,
    listAllRooms,
    getRoomById,
    updateRoom,
    deactivateRoom
};