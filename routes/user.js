const express = require('express');
const auth = require('auth'); //Application du middleware 'auth'
const router = express.Router();
const userCtrl = require('../controllers/user'); //Controleur d'association des différentes routes

//Route prévues par l'app front-end
router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);

module.exports = router; 