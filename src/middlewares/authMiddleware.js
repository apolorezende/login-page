require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token, req.headers)
  if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ msg: 'Token inválido' });
  }
}

module.exports = {
  verifyToken
};