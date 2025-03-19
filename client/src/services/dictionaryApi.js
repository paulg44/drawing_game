export const handleDictionaryAPI = async (randomItem) => {
  let audio = null;

  const handleDictionaryAPI = async () => {
    try {
      const apiResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomItem}`
      );
      const apiData = await apiResponse.json();
      const audioUrl =
        apiData[0].phonetics[1].audio || apiData[0].phonetics[0].audio;
      if (audio) {
        audio.pause();
      }
      audio = new Audio(audioUrl);
      audio.play();

      // await handleSaveImage();
    } catch (error) {
      console.error(
        "error fetching dictionary data or saving display image:",
        error
      );
    }
  };
};
