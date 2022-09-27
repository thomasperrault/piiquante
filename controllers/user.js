const bcrypt = require('bcrypt'); //Importation package de cryptage 'bcrypt'
const cryptojs = require('crypto-js'); //Importation de crypto-js
const jwt = require('jsonwebtoken'); //Importatin package de création de token
const User = require('../models/User'); //Importation Modèle user

//SIGNUP
exports.signup = (req, res, next) => {
    //Chiffrage de l'email avec crypto-js
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, "CLE_SECRETE").toString();
    //Cryptage du mdp (10 fois la boucle de cryptage)
    bcrypt.hash(req.body.password, 10) 
        .then(hash => { //Création d'un nouveau user avec l'adresse mail donné et le mdp crypté
            const user = new User({
                email: emailCryptoJs,
                password: hash
            });
            user.save() //Enregistrement du user dans la BDD
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //Code 201 pour création de ressource
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  };

//LOGIN
exports.login = (req, res, next) => {
    //Chiffrage de l'email avec crypto-js
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, "CLE_SECRETE").toString();
    User.findOne({email: emailCryptoJs})
        .then(user => { //Vérification si le user est dans la BDD
            if (user === null) { //User non enregistré
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
            }
            else { //User enregistré
                bcrypt.compare(req.body.password, user.password) //Comparaison du mdp écrit et enregistré
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
                    }
                    else {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign( //Appel de la fonction sign
                                { userId: user._id}, //Données à encoder
                                'RANDOM_TOKEN_SECRET', //Clé secrète d'encodage
                                {expiresIn: '24h'} //Le Token dure 24h
                            )
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({ error });
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
};
