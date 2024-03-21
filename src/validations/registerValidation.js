const bcrypt = require('bcrypt');
const User = require('../models/User');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function validateRegistrationData({ name, username, email, password, confirmPassword }) {
    if (!name) {
        return 'O nome é obrigatório';
    }
    if (!username) {
        return 'O nome de usuário é obrigatório';
    }
    if (!email) {
        return 'O email é invalido';
    }
    if (!validateEmail(email)) {
        return 'O email fornecido é inválido';
    }
    if (!password) {
        return 'A senha é obrigatória';
    }
    if (password !== confirmPassword) {
        return 'As senhas não são iguais';
    }
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return 'Username já cadastrado, use outro!';
    }
    const userEmailExist = await User.findOne({ email: email });
    if (userEmailExist) {
      return 'Email já cadastrado, use outro!';
    }
    return null; // Retorna null se todas as validações passarem
}

module.exports = {
    validateRegistrationData
};