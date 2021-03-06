require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser"); Inutile avec la dernière version d'express
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
//Rate Limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limité chaque IP à 100 requêtes / windowMs (Cette sécurité est bien souvent mis en place par l'hébergeur)
});
//
const helmet = require("helmet");
const path = require("path");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
//DOT ENV
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

//Connexion MongoDB
mongoose
  .connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
//

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD");
  next();
});
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(limiter);
// app.use(bodyParser.json()); Inutile avec la dernière version d'express
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
