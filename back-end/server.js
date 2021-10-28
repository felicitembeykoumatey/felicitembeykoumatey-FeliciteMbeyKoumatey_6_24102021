/**Déclaration const */
const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const result = dotenv.config();
const cors = require("cors");
app.use(cors());

app.set("port", process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  res.end("Voilà la réponse du serveur !");
});

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () =>
  console.log(`Serveur ouvert sur le bon port : ${process.env.PORT}`)
);
