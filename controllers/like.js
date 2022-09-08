const Sauce = require('../models/Sauce'); //Importation Modèle user

//Like-Dislike d'une sauce 
exports.likeDislikeSauce = (req, res, netx) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;   

    switch (like) { //Switch évalue l'expression "like"
        case 1 : //Ajout d'un "Like"
            Sauce.updateOne( //MAJ sur la BDD
                {_id: sauceId}, //Récupération de l'userId
                {$push: {usersLiked: userId}, //Push = ajoute l'userId dans le tableau des "j'aime"
                $inc: {likes: +1}} //Execute +1 au nombre de "j'aime"
            )
            .then(() => res.status(200).json({message: `Like`}))
            .catch((error) => res.status(400).json({error}))         
        break;
        case 0 : // Annulation du like/dislike
            Sauce.findOne({_id: sauceId})
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)) { //Si le tableau des likes contient l'userId
                    Sauce.updateOne(
                        {_id: sauceId}, //Récupération de l'userId 
                        {$pull: {usersLiked: userId}, //Pull = supprime l'userId dans le tableau des "Like" 
                        $inc: {likes: -1}} //Execute -1 au nombre de "Like"
                    )
                    .then(() => res.status(200).json({message: `Nothing`}))
                    .catch((error) => res.status(400).json({error}))
                };
                if (sauce.usersDisliked.includes(userId)) { //Si le tableau des dislikes contient l'userId
                    Sauce.updateOne(
                        {_id: sauceId}, //Récupération de l'userId 
                        {$pull: {usersDisliked: userId}, //Pull = supprime l'userId dans le tableau des "Dislike"
                        $inc: {dislikes: -1}} //Execute -1 au nombre de "Dislike"
                    )
                    .then(() => res.status(200).json({message: `Nothing`}))
                    .catch((error) => res.status(400).json({error}))
                };
            })
            .catch((error) => res.status(404).json({error}))
        break;
        case -1 : // Ajout d'un "Dislike"
            Sauce.updateOne(    
                {_id: sauceId}, 
                {$push: {usersDisliked: userId}, 
                $inc: {dislikes: +1}}
            )
            .then(() => {res.status(200).json({message: `Dislike`})})
            .catch((error) => res.status(400).json({error}))
        break;
          
        default:
            console.log(error);
      }
    }
