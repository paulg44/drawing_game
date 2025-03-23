import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.dictionaryapi.dev/api/v2/entries/en/square", () => {
    return HttpResponse.json([
      {
        phonetics: [{ audio: "test/audio.mp3" }],
      },
    ]);
  }),
];
