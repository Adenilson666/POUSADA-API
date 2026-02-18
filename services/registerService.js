const bcrypt = require('bcrypt');
const {User} = require('../models');
const AppError = require('../error/appError');


const registerUser = async ({name, email, password}) => {
  
    if (!name || !email || !password) {
        throw new AppError('Nome, e-mail e senha são obrigatórios.', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existUser) {
        throw new AppError('E-mail já cadastrado.', 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            password_hash
        });

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            throw new AppError('Email está em uso.', 409);
        }

        throw error;
    }
};

module.exports = {
    registerUser,
};