const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const AppError = require('../error/appError');


const loginUser = async ({email, password}) => {

    if (!email|| !password) {
        throw new AppError('Email e senha são obrigatórios.', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
        throw new AppError('Email ou senha inválidos.', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        throw new AppError('Email ou senha inválidos.', 401);
    }   

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return {
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    },
    
        token,
    };
};

const getMe = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return user;
}

const updateMe = async (userId, data) => {

    const allowed = ['name', 'email'];
    const keys = Object.keys(data || {});
    const extras = keys.filter(k => !allowed.includes(k));

    if (extras.length) {
        throw new AppError(`Campos não permitidos: ${extras.join(', ')}`, 400);
    }

    if (keys.length === 0) {
        throw new AppError('Nenhum dado fornecido para atualização.', 400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    if (data.email !== undefined) {
        if (typeof data.email !== 'string' || !data.email.trim()) {
            throw new AppError('E-mail inválido.', 400);
        }

        const normalizedEmail = data.email.trim().toLowerCase();

        if (!!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) === false) {
            throw new AppError('E-mail inválido.', 400);
        }

        const existing = await User.findOne({ where: { email: normalizedEmail } });

        if (existing && String(existing.id) !== String(userId)) {
            throw new AppError('E-mail já cadastrado.', 409);
        }

        user.email = normalizedEmail;
    }

    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || !data.name.trim()) {
            throw new AppError('Nome inválido.', 400);
        }

        if (data.name.trim().length > 100) {
            throw new AppError('Nome deve ter no máximo 100 caracteres.', 400);
        }

        user.name = data.name.trim();
    }
   
    await user.save();

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

const changeMyPassword = async (userId, {currentPassword, newPassword}) => {

    if (!currentPassword || !newPassword) {
        throw new AppError('Senha atual e nova senha são obrigatórias.', 400);
    }

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
        throw new AppError('Senha inválida.', 400);
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
        throw new AppError('Nova senha deve ter entre 8 e 72 caracteres.', 400);
    }

    if (currentPassword === newPassword) {
        throw new AppError('A nova senha deve ser diferente da senha atual.', 400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    const ok = await bcrypt.compare(currentPassword, user.password_hash);

    if (!ok) {
        throw new AppError('Senha atual inválida.', 401);
    }

    const password_hash = await bcrypt.hash(newPassword, 12);

    user.password_hash = password_hash;
    await user.save();

};

module.exports = {
    loginUser,
    getMe,
    updateMe,
    changeMyPassword
};