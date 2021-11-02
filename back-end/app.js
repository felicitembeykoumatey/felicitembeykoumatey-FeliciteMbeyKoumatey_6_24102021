const express = require("express");
const mongoose = require("mongoose");

//Connecter l'API à mon cluster MongoDB//
mongoose
  .connect(
    `
    mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qbnko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Oups, connexion à MongoDB échouée !"));

const app = express();

app.use((req, res) => {
  console.log("requête reçue");
});

app.use((req, res) => {
  res.json({ message: "votre requête a bien été reçue" });
});
module.exports = app;
console.log(app);
