import mongoose from "mongoose";

const shapesSchema = new mongoose.Schema({
  name: String,
  image: String,
});

export const Shapes = mongoose.model("Shapes", shapesSchema);
