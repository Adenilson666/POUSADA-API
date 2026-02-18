const authService = require('../services/authService');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser({ email, password });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await authService.getMe(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateMe = async (req, res, next) => {
    try {
        const result = await authService.updateMe(req.user.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const changeMyPassword = async (req, res, next) => {
    try {
        // Implementation for changing password goes here
        const { currentPassword, newPassword } = req.body;

        await authService.changeMyPassword(req.user.id, {currentPassword, newPassword});

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser,
    getMe,
    updateMe,
    changeMyPassword
};