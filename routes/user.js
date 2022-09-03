const express = require('express');
//const auth = require('../middleware/auth'); //Application du middleware 'auth'
const router = express.Router();
const multer = require('../middleware/multer-config'); 
const userCtrl = require('../controllers/user'); //Controleur d'association des différentes routes

//Route prévues par l'app front-end
router.post('/signup', /*auth,*/ multer, userCtrl.signup);
router.post('/login', /*auth,*/ multer, userCtrl.login);

module.exports = router;  