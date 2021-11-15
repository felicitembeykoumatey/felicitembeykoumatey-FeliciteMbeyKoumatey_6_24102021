// Importer mongoose pour la base de donnée
const mongoose = require("mongoose");

// Importation pour utilisation des variables d'environnements

const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

//Connecter l'API à mon cluster MongoDB//

mongoose
  .connect(
    `
    mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Oups, connexion à MongoDB échouée !"));

module.exports = mongoose;
