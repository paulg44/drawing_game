import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.dictionaryapi.dev/api/v2/entries/en/square", () => {
    return HttpResponse.json([
      {
        phonetics: [{ audio: "test/audio.mp3" }],
      },
    ]);
  }),

  http.get("http://localhost:3020/compare-images", async ({ request }) => {
    const body = await request.json();
    console.log("Mocked request received", body);
    return HttpResponse.json({ response: "Excellent" });
  }),
];
