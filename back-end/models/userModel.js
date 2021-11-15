// Importation de mongoose
const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

// Validation unique pour éviter les erreurs d'identifications.
/**Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in,
 * s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail. */

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
//Exportation du module
module.exports = mongoose.model("user", userSchema);
