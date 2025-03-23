import { fetchDictionaryAPI } from "../services/dictionaryApi";

test("fetch should return the audio URL when phonetics exists", async () => {
  const response = fetchDictionaryAPI();
  // const response =
  //   await "https://api.dictionaryapi.dev/api/v2/entries/en/square";
  // expect(response.status).toBe(200);
  // expect(response.statusText).toBe("OK");
  // expect(await response.json()).toEqual({
  //   firstName: "Paul",
  // });
});
