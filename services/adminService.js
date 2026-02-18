const { User } = require('../models');
const AppError = require('../error/appError');
const bcrypt = require('bcrypt');

const listUsers = async ({page = 1, limit = 10}) => {

    const pageNum = Number(page);
    const limitNum = Number(limit);

    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
        throw new AppError('Página ou limite inválidos.', 400);
    }

    const offset = (pageNum - 1) * limitNum;

    const { rows, count } = await User.findAndCountAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'ASC']],
        limit: limitNum,
        offset,
    });

    return {
        total: count,
        page: pageNum,
        limit: limitNum,
        users: rows,
    };
}

const updateUser = async (id, data) => {

    const allowed = ['name', 'email'];
    const keys = Object.keys(data || {});
    const extras = keys.filter(k => !allowed.includes(k));

    if (extras.length) {
        throw new AppError(`Campos não permitidos: ${extras.join(', ')}`, 400);
    }

    const user = await User.findByPk(id);

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

        if (existing && String(existing.id) !== String(id)) {
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

const updateUserRole = async (id, role) => {

    if (!role || typeof role !== 'string') {
        throw new AppError('Role é obrigatória.', 400);
    }

    const normalizedRole = role.trim().toLowerCase();
    if (!['user', 'admin'].includes(normalizedRole)) {
        throw new AppError('Role inválida.', 400);
    }

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    user.role = normalizedRole;

    await user.save();

    return {
        id: user.id,
        email: user.email,
        role: user.role
    };
};

const updateUserPassword = async (id, {newPassword}) => {

    if (!newPassword || typeof newPassword !== 'string') {
        throw new AppError('Nova senha é obrigatória.', 400);
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
        throw new AppError('Nova senha deve ter entre 8 e 72 caracteres.', 400);
    }

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    const password_hash = await bcrypt.hash(newPassword, 10);

    user.password_hash = password_hash;

    await user.save();
};

const deleteUser = async (id) => {

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    await user.destroy();

};

module.exports = {
    listUsers,
    updateUser,
    updateUserRole,
    updateUserPassword,
    deleteUser,
};