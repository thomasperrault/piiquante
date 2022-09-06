const mongoose = require('mongoose');

//Création du schéma de 'Sauce'
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: false }, //A revoir >>> [ "String <userId>" ]
    usersDisliked: { type: Array, required: false }, //A revoir >>> [ "String <userId>" ]
});

//Exportation du modèle avec comme arguments (nom du modèle, schéma)
module.exports = mongoose.model('Sauce', sauceSchema);