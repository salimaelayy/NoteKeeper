import { ConnexionDB } from "./commun/connexionDB.js";
import express from "express";
import { route as noteRouter } from "./Notes/route.js";
const port = 3000;
const database = new ConnexionDB();
const app = express();

app.use(express.json());
app.use("/notes", noteRouter);
app.get("/", (req, res) => {
  res.status(200).json({ statut: "UP" });
});
database.generateConnexion().then(() => {
  app.listen(port, () => {
    console.log(`Starting Server : ${port}`);
  });
});
