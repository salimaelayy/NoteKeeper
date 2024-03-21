import { ConnexionDB } from "./commun/connexionDB.js";
import express from "express";

const port = 3000;
const database = new ConnexionDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ statut: "UP" });
});
database.generateConnexion().then(() => {
  app.listen(port, () => {
    console.log(`Starting Server : ${port}`);
  });
});
