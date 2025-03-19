export const fetchDictionaryAPI = async (randomItem) => {
  try {
    const apiResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomItem}`
    );
    const apiData = await apiResponse.json();
    if (apiData[0]?.phonetics?.length) {
      return apiData[0].phonetics.find((p) => p.audio)?.audio || null;
    }

    return null;
  } catch (error) {
    console.error("error fetching dictionary data", error);
  }
};
