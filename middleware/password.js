//Importation du password-validator
const passwordValidator = require('password-validator');

//Creation du schema
const passwordSchema = new passwordValidator();

//Schéma du mot de passe
passwordSchema
.is().min(8)                                    // Minimum 8 caractères
.is().max(20)                                   // Maximum 20 caractères
.has().uppercase()                              // Au moins une majuscule
.has().lowercase()                              // Au moins une minuscule
.has().digits()                                 // Au moins un chiffre
.has().not().spaces()                           // Pas d'espace dans le mdp

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }
    else{
        return res
        .status(400)
        .json({error : "Mot de passe invalide : " + passwordSchema.validate('req.body.password', {list: true})})
    }
}