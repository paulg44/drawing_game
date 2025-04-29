// This will hold the logic for fetching the data from the database, currently the code i need is in MongoFetchTest

export const fetchFromMongo = async (randomItem) => {
  try {
    const response = await fetch("http://localhost:3020/api/shape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userShape: randomItem }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Server error", error);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data fromm MongoDB:", error);
  }
};
