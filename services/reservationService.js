const { Op } = require('sequelize');
const { Reservation, Room } = require('../models');
const AppError = require('../errors/appError');

const ACTIVE_STATUSES = ['confirmed', 'pending'];

const createReservation = async ({ user_id, room_id, check_in, check_out }) => {

    const room = await Room.findByPk(room_id);
    if (!room) throw new AppError('Quarto não encontrado.', 404);
    if (room.is_active === false) throw new AppError('Quarto indisponível para reserva.', 400);

    const conflit = await Reservation.findOne({
        where: {
            room_id,
            status: { [Op.in]: ACTIVE_STATUSES },
            [Op.and]: [
                {
                    check_in: { [Op.lt]: check_out },
                },
                {
                    check_out: { [Op.gt]: check_in },
                },
            ],
        },
    });

    if (conflit) throw new AppError('Conflito de datas na reserva.', 400);

    const reservation = await Reservation.create({
        user_id,
        room_id,
        check_in,
        check_out,
        status: 'pending',
    });

    return reservation;
};

const listMyReservations = async (user_id) => {
    return Reservation.findAll({
        where: { user_id },
        order: [['check_in', 'DESC']]
    });
};

const listAllReservations = async () => {
    return Reservation.findAll({
        order: [['check_in', 'DESC']]
    });
};

const cancelReservation = async ({ reservation_id, user_id, role}) => {
    const reservation = await Reservation.findByPk(reservation_id);
    if (!reservation) throw new AppError('Reserva não encontrada.', 404);

    const isAdmin = String(role || '').toLowerCase() === 'admin';

    if (!isAdmin) {
        throw new AppError('Acesso negado. Somente o administrador pode cancelar esta reserva.', 403);
    }

    if (reservation.status === 'canceled') {
        return reservation;
    }

    if (reservation.status === 'finished') {
        throw new AppError('Não é possível cancelar uma reserva já finalizada.', 400);
    }

    reservation.status = 'canceled';
    await reservation.save();
    return reservation;
};

module.exports = {
  createReservation,
  listMyReservations,
  listAllReservations,
  cancelReservation
};