const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateRegistrationData } = require('../validations/registerValidation');

async function registerUser(name, username, email, password, confirmPassword) {
  try {
    const validationError = await validateRegistrationData({ name, username, email, password, confirmPassword });
    if (validationError) {
      return validationError;
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      name,
      email,
      password: passwordHash,
    });
    await user.save();
    return 'Perfil Criado';
  } catch (error) {
    throw new Error('Erro server');
  }
}

module.exports = {
  registerUser
};