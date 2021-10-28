const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();

// mongoose.set('debug', true);

mongoose
  .connect(process.env.HIDE_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connxion à MongoDB Réussie"))
  .catch(() => console.log("Échec de connexion à MongoDB"));
