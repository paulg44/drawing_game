export const fetchDictionaryAPI = async (randomItem) => {
  try {
    const apiResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomItem.name}`
    );
    const apiData = await apiResponse.json();
    console.log(apiData);
    // return apiData;
    if (apiData[0]?.phonetics?.length) {
      console.log(apiData[0].phonetics[0].audio);
      return apiData[0].phonetics.find((p) => p.audio)?.audio || null;
    }

    return null;
  } catch (error) {
    console.error("error fetching dictionary data", error);
  }
};
