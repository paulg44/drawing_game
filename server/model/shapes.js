import mongoose from "mongoose";

const shapesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
});

export const Shapes = mongoose.model("Shapes", shapesSchema);
