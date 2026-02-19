const AppError = require('../errors/appError');

const validateCreateReservation = (req, res, next) => {
  const { room_id, check_in, check_out } = req.body || {};

  if (!room_id) throw new AppError('O campo "room_id" é obrigatório.', 400);

  if (!check_in || !check_out) throw new AppError('Os campos "check_in" e "check_out" são obrigatórios.', 400);

  const inDate = new Date(check_in);
  const outDate = new Date(check_out);
  
  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
    throw new AppError('Formato de data inválido. Use ISO 8601 (YYYY-MM-DD).', 400);
  }

  if (inDate >= outDate) {
    throw new AppError('A data de check-in deve ser anterior à data de check-out.', 400);
  }

  req.body.room_id = Number(room_id);
  req.body.check_in = String(check_in);
  req.body.check_out = String(check_out);

  return next();
};

const validateCancelReservation = (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new AppError('O campo "id" é obrigatório.', 400);
  return next();
};

module.exports = {
  validateCreateReservation,
  validateCancelReservation
};