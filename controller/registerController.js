const userService = require('../services/registerService');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user =  await userService.registerUser({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
};