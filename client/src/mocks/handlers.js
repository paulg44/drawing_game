import { rest } from "msw";

export const handlers = [
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/square`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            phonetics: [
              {
                audio: "https://audio-test.com/square.mp3",
              },
            ],
          },
        ])
      );
    }
  ),
];
