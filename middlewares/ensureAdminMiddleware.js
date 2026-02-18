const AppError = require('../error/appError');

module.exports = (req, res, next) => {
  // não autenticado
  if (!req.user) {
    throw new AppError('Token inválido ou ausente.', 401);
  }

  // autenticado, mas não é admin
  if (req.user.role !== 'admin') {
    throw new AppError('Acesso negado. Permissão de administrador necessária.', 403);
  }

  return next();
};
