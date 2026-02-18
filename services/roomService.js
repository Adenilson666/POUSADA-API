const { Room } = require('../models');
const AppError = require('../errors/appError');

const createRoom = async ({ number, type, price_per_night, is_active }) => {

    const existingRoom = await Room.findOne({ where: { number } });
    if (existingRoom) {
        throw new AppError('Número de quarto já existe.', 409);
    }

    const room = await Room.create({
        number,
        type,
        price_per_night,
        is_active: typeof is_active === 'boolean' ? is_active : true
    });

    return room;
};

const listActiveRooms = async () => {
    return Room.findAll({ where: { is_active: true }, order: [['number', 'ASC']] });
};

const listAllRooms = async () => {
    return Room.findAll({ order: [ ['is_active', 'DESC'], ['number', 'ASC']] });
}

const getRoomById = async (id) => {
    const room = await Room.findByPk(id);
    if (!room) {
        throw new AppError('Quarto não encontrado.', 404);
    }
    return room;
};

const updateRoom = async (id, payload) => {
    const room = await getRoomById(id);

    if (payload.number !== undefined && payload.number !== room.number) {
        const existingRoom = await Room.findOne({ where: { number: payload.number } });
        if (existingRoom) throw new AppError('Número de quarto já existe.', 409);
    }

    if (payload.number !== undefined) room.number = payload.number;
    if (payload.type !== undefined) room.type = payload.type;
    if (payload.price_per_night !== undefined) room.price_per_night = payload.price_per_night;
    if (payload.is_active !== undefined) room.is_active = payload.is_active;

    await room.save();
    return room;
};

const deactivateRoom = async (id) => {
    const room = await getRoomById(id);

    if (room.is_active === false) return room;

    room.is_active = false;
    await room.save();
    return room;
};

module.exports = {
    createRoom,
    listActiveRooms,
    listAllRooms,
    getRoomById,
    updateRoom,
    deactivateRoom
};