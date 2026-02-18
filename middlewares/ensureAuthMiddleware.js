const jwt = require('jsonwebtoken');
const AppError = require('../error/appError');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido.', 401);
  }

  const [scheme, token] = authHeader.trim().split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Formato de token inválido.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ fica disponível nas rotas protegidas
    req.user = { id: decoded.id, role: decoded.role };

    return next();
  } catch (err) {
    throw new AppError('Token inválido ou expirado.', 401);
  }
};
