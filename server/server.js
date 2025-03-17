import express from "express";
import cors from "cors";
import fs from "fs-extra";
import dotenv from "dotenv";
import path from "path";
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
  const { userImage, metadata } = req.body;

  if (!userImage) {
    return res.status(400).send({ error: " images needed in server" });
  }

  try {
    const userBase64Data = userImage.replace(/^data:image\/png;base64,/, "");

    const userImageFileName = `${metadata.name}-user.png`;

    const userImagePath = path.join(
      __dirname,
      "/compare_images",
      userImageFileName
    );

    fs.mkdirSync(path.dirname(userImagePath), { recursive: true });

    fs.writeFile(userImagePath, Buffer.from(userBase64Data, "base64"));

    res.send({
      message: "Image saved successfully server",
      userImageFileName,
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

  // I could add all this extra information for each shape etc in a separate json file the same way I have done with the chatbot in my portfolio
  // const shapeDescriptions = {
  //   star: `
  //     A *perfect* star drawing (100 points) would have:
  //     * Five distinct points.
  //     * The points should be roughly equally spaced around a central point.
  //     * The lines connecting the points should be relatively straight (for a child's drawing) and form a closed shape.
  //     * The overall shape should be clearly recognizable as a five-pointed star and not resemble any other shape (e.g., a circle, a square, a scribble).
  //   `,
  //   circle: `
  //     A *perfect* circle drawing (100 points) would have:
  //     * A continuous, closed curve with no sharp angles.
  //     * All points on the curve should be equidistant from the center.
  //     * The shape should be clearly recognizable as a circle and not resemble any other shape (e.g., an oval, a square, a scribble).
  //   `,
  //   square: `
  //     A *perfect* square drawing (100 points) would have:
  //     * Four distinct corners.
  //     * Four straight sides of equal length.
  //     * The corners should be right angles (90 degrees).
  //     * The shape should be clearly recognizable as a square and not resemble any other shape (e.g., a rectangle, a diamond, a scribble).
  //   `,
  //   triangle: `
  //     A *perfect* triangle drawing (100 points) would have:
  //     * Three distinct corners.
  //     * Three straight sides.
  //     * The shape should be clearly recognizable as a triangle and not resemble any other shape (e.g., a line, a square, a scribble).`,
  // };

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // const shapeDescription = shapeDescriptions[randomImageName];

    // if (!shapeDescription) {
    //   return res
    //     .status(400)
    //     .json({ error: `Description not found for shape: ${randomImageName}` });
    // }

    const prompt = `
A child (age 8) drew this. I want you to score the drawing out of 100 for how well it represents a ${randomImageName}. I am looking for a drawing that accurately captures the _shape_ of a ${randomImageName}.

    
    I want you to score the drawing out of 100 for how well it represents a ${randomImageName}. I am looking for a drawing that accurately captures the *shape* of a ${randomImageName}.I want you to be accurate when you do the analysis on this image of a ${randomImageName}

A _perfect_ ${randomImageName} drawing (100 points) would have:

- The characteristic features of a ${randomImageName} (describe these for each shape you'll use – see examples below).
- The elements should be roughly equally spaced or arranged as expected for a ${randomImageName}.
- The lines connecting the elements should be relatively straight and form a closed shape (if applicable).
- The overall shape should be clearly recognizable as a ${randomImageName} and not resemble any other shape.

A _good_ ${randomImageName} drawing (70-90 points) would have:

- The characteristic features of a ${randomImageName}, but they might not be perfectly executed.
- The shape is still recognizable as a ${randomImageName}.

A _mediocre_ ${randomImageName} drawing (40-60 points) might:

- Have some of the characteristic features, but they might be very uneven or poorly connected.
- The shape might be somewhat ambiguous but still hint at a ${randomImageName}.

A _bad_ ${randomImageName} drawing (1-39 points) would:

- Not clearly have the characteristic features of a ${randomImageName}.
- The shape is not recognizable as a ${randomImageName}. It might be a scribble, a line, or resemble a completely different object.

If the drawing is just a scribble, a single line, or if it resembles something other than a ${randomImageName}, give it a very low score (below 20).

Return either "Excellent" for scores over score 95, "Great" for scores between 80 - 94, and "Good" for score between 60-79. Anything lower than 59 return "Try Again". Only give me the words as I've stated nothing else. `;

    const imageParts = {
      inlineData: {
        data: userImage,
        mimeType: "image/png",
      },
    };

    const generateContent = await model.generateContent([prompt, imageParts]);

    const responseText = generateContent.response.text();

    // const scoreMatch = responseText.match(/\d+/);
    // const score = scoreMatch ? parseInt(scoreMatch[0], 10) : null;

    // if (score === null || score < 1 || score > 100) {
    //   console.error("Gemini returned invalid score:", responseText);
    //   return res
    //     .status(500)
    //     .json({ error: "Invalid score returned from Gemini" });
    // }

    // Sending response text while I debug
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error comparing images in server:", error);
    res.status(500).send({ error: "Failed to compare images in server" });
  }
});

const PORT = 3020;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
