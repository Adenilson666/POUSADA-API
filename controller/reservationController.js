const reservationService = require('../services/reservationService');

const createReservation = async (req, res, next) => {
    try {
        const user_id = req.user.id;

        const reservation = await reservationService.createReservation({
            user_id,
            room_id: req.body.room_id,
            check_in: req.body.check_in,
            check_out: req.body.check_out
        });

        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

const listMyReservations = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const reservations = await reservationService.listMyReservations(user_id);
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

const listAllReservations = async (req, res, next) => {
    try {
        const reservations = await reservationService.listAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

const cancelReservation = async (req, res, next) => {
    try {
        const reservation_id = req.params.id;

        const reservation = await reservationService.cancelReservation({
            reservation_id,
            user_id: req.user.id,
            role: req.user.role
        });

        res.status(200).json({
            message: 'Reserva cancelada com sucesso.',
            reservation
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReservation,
    listMyReservations,
    listAllReservations,
    cancelReservation
};