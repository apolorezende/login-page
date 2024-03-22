const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function validateRegistrationData(username, password,) {
    if (!username) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }
      // Gera o token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ msg: 'Login bem-sucedido', token });
      const userData = await User.findOne({ username });
      return userData;
}

module.exports = {
    validateRegistrationData
};