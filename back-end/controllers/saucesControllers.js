const Sauce = require("../models/Sauce");
const fs = require("fs");
const xss = require("xss");

/**********-------Création Sauce-----****************/
exports.createSauce = (req, res, next) => {
  const sauceData = JSON.parse(req.body.sauce);
  delete sauceData._id;
  const sauce = new Sauce({
    ...sauceData,
    name: xss(sauceData.name),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    description: xss(sauceData.description),
    likes: "0",
    dislikes: "0",
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: "Sauce créée et enregistrée !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/******-----Methode getAll pour exporter les sauces-----***************/

/**Toutes les sauces */
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/**une sauce */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

/********------Modifier sauce-----************/
exports.modifySauce = (req, res, next) => {
  const sauceData = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            {
              _id: req.params.id,
            },
            {
              ...sauceObject,
              _id: req.params.id,
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Sauce modifié !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        });
      } else {
        Sauce.updateOne(
          {
            _id: req.params.id,
          },
          {
            ...sauceObject,
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(200).json({
              message: "Sauce modifié !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

//********---Ajouter Like aux sauces----********/
exports.addLike = (req, res, next) => {
  let userLike = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      const usersLiked = sauce.usersLiked;
      const usersDisliked = sauce.usersDisliked;

      //si 0
      if (userLike == 0) {
        //où est l'utisisateur?
        const foundUserLiked = usersLiked.find((usersId) => usersId == userId);
        const foundUserDisliked = usersDisliked.find(
          (usersId) => usersId == userId
        );

        //si dans liked
        if (foundUserLiked) {
          //suppression des Usersliked et -1 dans likes
          Sauce.updateOne(
            {
              _id: req.params.id,
            },
            {
              $pull: {
                usersLiked: userId,
              },
              $inc: {
                likes: -1,
              },
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Votre like a été rétiré",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );

          //si dans disliked
        } else if (foundUserDisliked) {
          //suppression dans Usersdisliked et -1 dans dislikes
          Sauce.updateOne(
            {
              _id: req.params.id,
            },
            {
              $pull: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: -1,
              },
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Votre dislike a été rétiré",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }

        //si 1
      } else if (userLike == 1) {
        //ajout dans Usersliked et +1 dans likes
        Sauce.updateOne(
          {
            _id: req.params.id,
          },
          {
            $push: {
              usersLiked: userId,
            },
            $inc: {
              likes: 1,
            },
          }
        )
          .then(() =>
            res.status(200).json({
              message: "Votre Like a été ajouté",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );

        //si -1
      } else if (userLike == -1) {
        //ajout dans Usersdisliked et +1 dans dislikes
        Sauce.updateOne(
          {
            _id: req.params.id,
          },
          {
            $push: {
              usersDisliked: userId,
            },
            $inc: {
              dislikes: 1,
            },
          }
        )
          .then(() =>
            res.status(200).json({
              message: "Votre Dislike a été ajouté",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

/**----Suppression sauce----********/

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({
          _id: req.params.id,
        })
          .then(() =>
            res.status(200).json({
              message: "Sauce supprimé !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};
