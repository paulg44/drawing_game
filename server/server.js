import express from "express";
import cors from "cors";
import fs from "fs-extra";
import dotenv from "dotenv";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

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
  const { userImage, randomImageName } = req.body;

  if (!userImage || !randomImageName) {
    return res.status(400).send({ error: "Paths for both images needed" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `A child drew this. Can you give me a score out of 100 for the likeness of a ${randomImageName}. Please bear in mind that a child of 8 years old drew this. I want you to return only a number between 1 and 100`;

    const imageParts = {
      inlineData: {
        data: userImage,
        mimeType: "image/png",
      },
    };

    const generateContent = await model.generateContent([prompt, imageParts]);

    const responseText = generateContent.response.text();

    const scoreMatch = responseText.match(/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[0], 10) : null;

    if (score === null || score < 1 || score > 100) {
      console.error("Gemini returned invalid score:", responseText);
      return res
        .status(500)
        .json({ error: "Invalid score returned from Gemini" });
    }

    res.status(200).json({ score: score });
  } catch (error) {
    console.error("Error comparing images in server:", error);
    res.status(500).send({ error: "Failed to compare images in server" });
  }
});

const PORT = 3020;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
