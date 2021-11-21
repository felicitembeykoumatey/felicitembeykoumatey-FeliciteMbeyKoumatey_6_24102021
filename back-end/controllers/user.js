//Importation de cryptage avec bcrypt
const bcrypt = require("bcrypt");
//Importation Json Web Token
const jwt = require("jsonwebtoken");

//Importation maskData
const maskData = require("maskdata");

//mportation user model
const User = require("../models/userModel");

// Exportation de la fonction sign up (s'inscrire) et ajouter marquage masqué les données
//maskData
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: maskData.maskEmail2(req.body.email),
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé!",
          })
        )
        .catch((error) =>
          res.status(400).json({
            message: "l'adresse mail existe déjà",
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

// Exportation de la fonction login (se connecter)
exports.login = (req, res, next) => {
  User.findOne({ email: maskData.maskEmail2(req.body.email) })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
