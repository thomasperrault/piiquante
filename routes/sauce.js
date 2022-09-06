const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //Application du middleware 'auth'
const multer = require('../middleware/multer-config'); 
const sauceCtrl = require('../controllers/sauce'); //Controleur d'association des différentes routes

//Route prévues par l'app front-end
router.get('/', auth, sauceCtrl.getAllSauce); //Renvoie tableau de toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); //Renvoie la sauce avec l'id fourni
router.post('/', auth, multer, sauceCtrl.createSauce); //Capture et enregistre l'img, analyse la sauce en string dans la BBD. Initialise les likes
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //Met à jour la sauce avec l'id fourni
router.delete('/:id', auth, sauceCtrl.deleteSauce); //Supprime la sauce avec l'id fourni
//router.post('/:id/like', auth, multer, sauceCtrl.likeSauce); //Définit le statut "like"

module.exports = router;  