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


module.exports = {
    loginUser,
};