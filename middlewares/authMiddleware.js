const AppError = require('../error/appError');

const loginMiddleware = (req, res, next) => {
  let { email, password } = req.body;

  // 1) presença
  if (email == null || password == null) {
    throw new AppError('E-mail e senha são obrigatórios.', 400);
  }

  // 2) tipo
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new AppError('E-mail e senha inválidos.', 400);
  }

  // 3) normalização
  email = email.trim().toLowerCase();
  password = password.trim();

  // 4) vazio
  if (!email || !password) {
    throw new AppError('E-mail e senha são obrigatórios.', 400);
  }

  // 5) formato básico e limites
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 8 && password.length <= 72;

  if (!emailOk || !passOk) {
    throw new AppError('E-mail e senha inválidos.', 400);
  }

  // ✅ devolve normalizado pro resto do fluxo
  req.body.email = email;
  req.body.password = password;

  return next();
};

module.exports = loginMiddleware;
