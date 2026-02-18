const adminService = require('../services/adminService');

const listUsers = async (req, res, next) => {
    try {
        const { page, limit} = req.query;

        const result = await adminService.listUsers({ page, limit });

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await adminService.updateUser(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const result = await adminService.updateUserRole(id, role);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateUserPassword = async (req, res, next) => {
    try {
        const { id } = req.params;

        const newPassword = req.body.newPassword || req.body.new_password;

        await adminService.updateUserPassword(id, {newPassword});

        return res.status(200).send();
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (String(req.user.id) === String(id)) {
            throw new AppError('Você não pode excluir seu próprio usuário.', 400);
        }

        await adminService.deleteUser(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listUsers,
    updateUser,
    updateUserRole,
    updateUserPassword,
    deleteUser
};