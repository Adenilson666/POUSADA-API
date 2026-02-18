const AppError = require('../errors/appError');

const ALLOWED_TYPES = ['single', 'double', 'suite'];

const validateCreateRoom = (req, res, next) => {
  const { number, type, price_per_night } = req.body || {};

  if (!number) {
    throw new AppError('O campo "number" é obrigatório.', 400);
  }

const trimmedNumber = String(number).trim();
  if (!trimmedNumber) {
    throw new AppError('O campo "number" não pode estar vazio.', 400);
}

if (!type || !ALLOWED_TYPES.has(type)) {
    throw new AppError("type inválido: Use 'single', 'double' ou 'suite'.", 400);
}

const price = Number(price_per_night);
if (!Number.isFinite(price) || price <= 0) {
    throw new AppError('O campo "price_per_night" deve ser um número maior que zero.', 400);
}

// Normalização
req.body.number = trimmedNumber;
req.body.price_per_night = price;

return next();

};

const validateUpdateRoom = (req, res, next) => {
    const { number, type, price_per_night, is_active } = req.body || {};

    if (number !== undefined) {
        const trimmedNumber = String(number).trim();
        if (!trimmedNumber) {
            throw new AppError('O campo "number" não pode estar vazio.', 400);
        }
        req.body.number = trimmedNumber;
    }

    if (type !== undefined && !ALLOWED_TYPES.includes(type)) {
        throw new AppError("type inválido: Use 'single', 'double' ou 'suite'.", 400);
    }

    if (price_per_night !== undefined) {
        const price = Number(price_per_night);
        if (!Number.isFinite(price) || price <= 0) {
            throw new AppError('O campo "price_per_night" deve ser um número maior que zero.', 400);
        }
        req.body.price_per_night = price;
    }

    if (is_active !== undefined && typeof is_active !== 'boolean') {
        throw new AppError('O campo "is_active" deve ser um valor booleano (true/false).', 400);
    }

    // Se nenhum campo foi fornecido para atualização
    if (number === undefined && type === undefined && price_per_night === undefined && is_active === undefined) {
        throw new AppError('Envie ao menos um campo para atualizar.', 400);
    }

    return next();
};

module.exports = {
    validateCreateRoom,
    validateUpdateRoom
};