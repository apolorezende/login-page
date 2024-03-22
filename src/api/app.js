require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const registerRoutes = require('../routes/registerRounter');
const loginRoutes = require('../routes/loginRoutes');

const app = express();

app.use(express.json());

// rota simples
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API!'});
});
// rota register
app.use('/auth/register', registerRoutes);
// rota login
app.use('/auth/login', loginRoutes)
// rota de usauario
app.use('/profile', loginRoutes)

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.tfjpsgc.mongodb.net`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));