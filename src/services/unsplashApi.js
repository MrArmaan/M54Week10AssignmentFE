import axios from "axios";

const API_KEY = "qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU";
const API_BASE_URL = "https://api.unsplash.com";

const searchPhotos = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/photos`, {
      params: { query },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for photos:", error);
    throw error;
  }
};

export default searchPhotos;
