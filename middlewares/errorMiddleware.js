const AppError = require('../error/appError');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: 'Erro interno do servidor.',
  });
};

module.exports = errorMiddleware;
