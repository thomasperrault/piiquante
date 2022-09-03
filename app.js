const express = require('express'); //Importation de express 
const mongoose = require('mongoose'); //Importation de mongoose

const User = require('./models/User');

const userRoutes = require('./routes/user'); //Importation du routeur "user" 

//Connexion à mongodb
mongoose.connect('mongodb+srv://piiquanteUser:piiquanteUserMdp@piiquante.8mgit4j.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Lancement de express
const app = express();

//Pouvoir accéder au corp de la requête
app.use(express.json());

//CORS - Middleware général appliqué à toutes les routes du serveur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Routes
app.use('/api/auth', userRoutes);    

//Export de l'application pour y accéder depuis les autres fichiers du projet (serveur)
module.exports = app;