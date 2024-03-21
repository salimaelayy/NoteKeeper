import mongoose from "mongoose";
import dotenv from "dotenv";
import e from "express";

dotenv.config();
const { URI } = process.env;

export class ConnexionDB {
  constructor() {
    this.dbConnexion = null;
  }
  generateConnexion = async () => {
    try {
      this.dbConnexion = await mongoose.connect(URI);
      console.log("DATABASE CONNECTED");
    } catch (error) {
      console.log("Error ConnectionDB");
      this.dbConnexion = null;
    }
  };

  getConnexion() {
    if (!this.dbConnexion) this.generateConnexion();
    return this.dbConnexion;
  }
}
