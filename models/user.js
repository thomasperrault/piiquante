const mongoose = require('mongoose');
//Plugin de validation de champ unique
const uniqueValidator = require('mongoose-unique-validator');


//Création du schéma de 'l'utilisateur'
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//Vérification d'adresse mail unique 
userSchema.plugin(uniqueValidator);
//Exportation du modèle avec comme arguments (nom du modèle, schéma)
module.exports = mongoose.model('User', userSchema); 


