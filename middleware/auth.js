const jwt = require('jsonwebtoken');

//Middleware de vérification du token reçu par le frontend qui permettra uniquement aux requêtes identifiés de réussir 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //Récupération du jwt
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();
    } 
    catch(error) {
        res.status(401).json({ error });
    }
}