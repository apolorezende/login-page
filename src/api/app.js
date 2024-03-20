// server.js
require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

const app = express();

// models
const User = require('../models/User')
// credenciais 
const dbUser = process.env.DB_USER;
const dbPassword= process.env.DB_PASSWORD

app.use(express.json());

// rota simples
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a API!'});
  });

app.post('/register', async(req, res) => {
    const {username, name , email, password, confirmPassword} = req.body;
    if (!name) {
      return res.status(422).json({ msg: 'O nome é Obrigatório'})
    }
    if (!username) {
      return res.status(422).json({ msg: 'O nome é Obrigatório'})
    }
    if (!email) {
      return res.status(422).json({ msg: 'O email é Obrigatório'})
    }
    if (!password) {
      return res.status(422).json({ msg: 'O senha é Obrigatório'})
    }
    if (password !== confirmPassword) {
      return res.status(422).json({ msg: 'As senhas nao são parecidas'})
    }
    // check username existente
    const usernameExist = await User.findOne({ email: email})
    if (usernameExist)
      return res.status(422).json({msg: 'Username já cadastrado, use outro!'})
    // check usuario existente
    const userExist = await User.findOne({ email: email})
    if (userExist)
      return res.status(422).json({msg: 'Email já cadastrado, use outro!'})
    // criptografia de senhas 
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // creando usuario
    const user = new User({
      name,
      email,
      password: passwordHash,
    })

    try {
      await user.save()
      res.status(201).json({ msg: 'Perfil Criado'})
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Erro server'})
    }
  });


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.tfjpsgc.mongodb.net/`).then(() => {
  app.listen(PORT)
}).catch((err) => console.log(err))


