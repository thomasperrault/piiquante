const express = require('express');
//const auth = require('../middleware/auth'); //Application du middleware 'auth'
const router = express.Router();
const userCtrl = require('../controllers/user'); //Controleur d'association des différentes routes

//Route prévues par l'app front-end
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;  