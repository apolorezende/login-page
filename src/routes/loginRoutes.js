const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', loginController.login);

// Rota protegida
router.get('/:id', authMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ msg: 'Perfil do usuário' });
});

module.exports = router;