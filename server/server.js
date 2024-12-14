import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.post("/save-image", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).send({ error: "No image data received in server" });
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const savePath = path.join(__dirname, "images", "canvas_drawing.png");

  fs.mkdirSync(path.dirname(savePath), { recursive: true });
  fs.writeFile(savePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("error saving image server side:", err);
      return res.status(500).send("Failed to save image server side");
    }
    res.send({ message: "Image saved successfully server" });
  });
});

const PORT = 3020;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
