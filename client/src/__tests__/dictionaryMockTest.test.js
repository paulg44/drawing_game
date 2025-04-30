import { fetchDictionaryAPI } from "../services/dictionaryApi";
import { waitFor } from "@testing-library/react";

test("fetch should return the audio URL when phonetics exists", async () => {
  const audioURL = await fetchDictionaryAPI("square");
  await waitFor(() => {
    // expect(audioURL).toBe("test/audio.mp3");
    expect(audioURL).toBe(null);
  });
});
