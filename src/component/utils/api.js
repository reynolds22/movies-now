// utils/api.js
const API_KEY = "808196157aa973f359929571d9321e60";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchDetails = async (type, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error(`Failed to fetch ${type} with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};
