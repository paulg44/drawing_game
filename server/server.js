import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { PNG } from "pngjs";
import Pixelmatch from "pixelmatch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(
  "/images",
  express.static(path.join(__dirname, "client", "assets", "data"))
);

app.post("/save-image", async (req, res) => {
  const { userImage, randomImage, metadata } = req.body;

  if (!userImage || !randomImage) {
    return res.status(400).send({ error: "Both images needed in server" });
  }

  try {
    const userBase64Data = userImage.replace(/^data:image\/png;base64,/, "");
    const randomBase64Data = randomImage.replace(
      /^data:image\/(jpeg|png);base64,/,
      ""
    );

    const userImageFileName = `${metadata.name}-user.png`;
    const randomImageFileName = `${metadata.name}-random.png`;

    const userImagePath = path.join(
      __dirname,
      "/compare_images",
      userImageFileName
    );
    const randomImagePath = path.join(
      __dirname,
      "/compare_images",
      randomImageFileName
    );

    fs.mkdirSync(path.dirname(userImagePath), { recursive: true });

    fs.writeFile(userImagePath, Buffer.from(userBase64Data, "base64"));
    const randomImageBuffer = Buffer.from(randomBase64Data, "base64");
    await sharp(randomImageBuffer).toFormat("png").toFile(randomImagePath);

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

app.post("/compare-images", async (req, res) => {
  const { userImagePath, randomImagePath } = req.body;

  if (!userImagePath || !randomImagePath) {
    return res.status(400).send({ error: "Paths for both images needed" });
  }

  try {
    const userImageBuffer = Buffer.from(
      userImagePath.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    const randomImageBuffer = Buffer.from(
      randomImagePath.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );

    const userImage = PNG.sync.read(userImageBuffer);
    const randomImage = PNG.sync.read(randomImageBuffer);

    const { width: userWidth, height: userHeight } = userImage;
    const { width: randomWidth, height: randomHeight } = randomImage;

    if (userWidth !== randomWidth || userHeight !== randomHeight) {
      // Need to trim canvas image to match png random
      return res.status(400).send({
        error: "Images must have the same dimensions for comparison",
        userDimensions: { userWidth, userHeight },
        randomDimensions: { randomWidth, randomHeight },
      });
    }

    const diff = new PNG({ width: userWidth, height: userHeight });
    const numDiffPixels = Pixelmatch(
      userImage.data,
      randomImage.data,
      diff.data,
      userWidth,
      userHeight,
      { threshold: 0.1 }
    );

    res.send({ numDiffPixels });
  } catch (error) {
    console.error("Error comparing images in server:", error);
    res.status(500).send({ error: "Failed to compare images in server" });
  }
});

const PORT = 3020;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
