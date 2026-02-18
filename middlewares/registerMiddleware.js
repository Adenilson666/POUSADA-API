const AppError = require('../error/appError');

const registerMiddleware = (req, res, next) => {
  let { name, email, password } = req.body;

  // 1) presença (null ou undefined)
  if (name == null || email == null || password == null) {
    throw new AppError('Nome, e-mail e senha são obrigatórios.', 400);
  }

  // 2) tipo
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    throw new AppError('Nome, e-mail e senha devem ser strings.', 400);
  }

  // 3) bloqueio de role
  if ('role' in req.body) {
    throw new AppError('Você não pode enviar o campo role.', 400);
  }

  // 4) normalização
  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  // 5) vazio
  if (!name || !email || !password) {
    throw new AppError('Nome, e-mail e senha não podem estar vazios.', 400);
  }

  // 6) regras de nome
  if (/^\d+$/.test(name)) {
    throw new AppError('O campo nome não pode ser uma string de números.', 400);
  }

  if (name.length > 100) {
    throw new AppError('Nome não pode exceder 100 caracteres.', 400);
  }

  // 7) regras de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError('Formato de e-mail inválido.', 400);
  }

  if (email.length > 191) {
    throw new AppError('E-mail não pode exceder 191 caracteres.', 400);
  }

  // 8) regras de senha
  if (password.length < 8 || password.length > 72) {
    throw new AppError('Senha deve ter entre 8 e 72 caracteres.', 400);
  }

  // ✅ devolve normalizado
  req.body.name = name;
  req.body.email = email;
  req.body.password = password;

  return next();
};

module.exports = registerMiddleware;
