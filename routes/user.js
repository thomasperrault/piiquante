const express = require('express');
const password = require('../middleware/password'); //Application du middleware 'auth'
const router = express.Router();
const userCtrl = require('../controllers/user'); //Controleur d'association des différentes routes

//Route prévues par l'app front-end
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;  