//Importation multer
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

//Objet de configuration pour multer 
const storage = multer.diskStorage({ //Enregistrement sur le disque
    destination: (req, file, callback) => { //Destination d'enregistrement
        callback(null, 'images')
    },
    filename: (req, file, callback) => { //Determine le nom de fichier à utiliser
        const name = file.originalname.split(' ').join('_'); //Génération du nom avec nom d'origine + remplacement des espaces par des _ avec split
        const extension = MIME_TYPES[file.mimetype]; //Application d'une extension au fichier en prenant le Mime-types
        callback(null, name + Date.now() + '.' + extension); 
    }
});

//Exportation du middleware 
module.exports = multer({ storage }).single('image'); 