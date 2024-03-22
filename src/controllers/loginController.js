const jwt = require('jsonwebtoken');
const userService = require('../services/loginService');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
}

async function logout(req, res) {
  // Lógica para fazer logout
  res.status(200).json({ msg: 'Logout bem-sucedido' });
}

module.exports = {
  login,
  logout
};