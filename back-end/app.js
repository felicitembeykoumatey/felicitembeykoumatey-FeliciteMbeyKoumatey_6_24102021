// Importation de express
const express = require("express");
const Sauce = require("./models/sauceModel");
// Importation de morgan (logger http)
const morgan = require("morgan");

// Importation connexion mongoose (le code qui me permet de connecter ma base des données au back-end)
const mongoose = require("./db/db");

// Pour créer une application express
const app = express();
//logger les requests et les responses
app.use(morgan("dev"));

// Gérer les problèmes de CORS(Cross-Origin Request Sharing)

// App.use
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  console.log("requête reçue");
  next();
});

app.use((req, res) => {
  res.json({ message: "votre requête a bien été reçue" });
});

//Exportation de app.js pour pouvoir y accèder depuis un autre fichier

module.exports = app;
