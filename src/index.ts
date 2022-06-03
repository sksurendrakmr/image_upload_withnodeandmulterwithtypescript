import express from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/img-upload")
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error occured while connecting to DB", error));

const app = express();
app.use(express.json());

app.listen(8000, () => console.log("Server started.."));
