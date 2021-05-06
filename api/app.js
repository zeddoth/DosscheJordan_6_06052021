//REQUIRED
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const cors = require("cors");
//

//CONNEXION MONGODB
mongoose
  .connect(
    "mongodb+srv://zeddoth:dGKOn5VL1xMHqj7C@zedclust.7wsv1.mongodb.net/sopekocko?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
