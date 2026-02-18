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


module.exports = {
    listUsers,
};