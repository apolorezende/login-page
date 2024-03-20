// server.js
require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

// credenciais 
const dbUser = process.env.DB_USER;
const dbPassword= process.env.DB_PASSWORD

// Rota GET simples
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a API!'});
  });

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.tfjpsgc.mongodb.net/`).then(() => {
  app.listen(PORT)
}).catch((err) => console.log(err))


