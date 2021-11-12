//Importer le package HTTP de node.js  pour avoir les outils pour créer le serveur
const http = require('http');
//Importer l'application app.js
const app = require('./app');


// Parametrage du port avec la méthode set de Expresss
app.set ("port", 3000);
//Méthode createServer() prend en argument 
// Fonction qui sera appelé à chaque requete reçu par le serveur
// Fonctions seront dans app.js

const server = http.createServer(app);
// le serveur écoute les requetes sur le port
server.listen(3000)
