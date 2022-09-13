const express = require('express');  //Importation de express
const rateLimit = require('express-rate-limit'); //Importation de rate-limit
const mongoose = require('mongoose'); //Importation de mongoose
const path = require('path'); //Accès au path du serveur
const dotenv = require('dotenv'); //Importation package pour utiliser les variables d'environnement
const result = dotenv.config();
const helmet = require('helmet');

const userRoutes = require('./routes/user'); //Importation routeur "user" 
const sauceRoutes = require('./routes/sauce'); //Importation routeur "sauce"

//Connexion à mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.8mgit4j.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Lancement de rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP a 100 requete par windowMs
  handler: function (req, res,) {
    return res.status(429).json({
      error: 'Vous avez envoyé trop de requetes, merci de renouveler votre demande ultérieurement'
    })
  }
});

//Lancement de express
const app = express();

//Pouvoir accéder au corp de la requête
app.use(express.json());

//CORS - Middleware général appliqué à toutes les routes du serveur
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Lancement de rateLimit
app.use(limiter);

//Routes
app.use('/api/auth', userRoutes);    
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//Export de l'application pour y accéder depuis les autres fichiers du projet (serveur)
module.exports = app;