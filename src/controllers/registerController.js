const userService = require('../services/registerService');

async function registerController(req, res) {
  const { name, username, email, password, confirmPassword } = req.body;
  try {
    const result = await userService.registerUser(name, username, email, password, confirmPassword);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  registerController
};