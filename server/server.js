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
  const { userImage, randomImage, metadata } = req.body;

  if (!userImage || !randomImage) {
    return res.status(400).send({ error: "Both images needed in server" });
  }

  try {
    const userBase64Data = userImage.replace(/^data:image\/png;base64,/, "");
    const randomBase64Data = randomImage.replace(
      /^data:image\/png;base64,/,
      ""
    );

    const userImageFileName = `${metadata.name}-${Date.now()}.png`;
    const randomImageFileName = `${metadata.name}-${Date.now()}.png`;

    const userImagePath = path.join(__dirname, "images", userImageFileName);
    const randomImagePath = path.join(__dirname, "images", randomImageFileName);

    fs.mkdirSync(path.dirname(userImagePath), { recursive: true });

    fs.writeFile(userImagePath, userBase64Data, "base64");
    fs.writeFile(randomImagePath, randomBase64Data, "base64");

    res.send({
      message: "Image saved successfully server",
      userImageFileName,
      randomImageFileName,
    });
  } catch (error) {
    console.error("Error saving images in server:", error);
    res.status(500).send({ error: "Failed to save images in server" });
  }
});

const PORT = 3020;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
