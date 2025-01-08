import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const spotifyApi = {
  // Analyses temporelles
  getTracksByYear: async () => {
    const response = await axios.get(`${BASE_URL}/songs-by-year`);
    return response.data;
  },

  getTracksByArtistYear: async (year) => {
    const response = await axios.get(`${BASE_URL}/artist/${year}`);
    return response.data;
  },

  // Analyses musicales
  getAcousticnessByYear: async () => {
    const response = await axios.get(`${BASE_URL}/acousticness-per-year`);
    return response.data;
  },

  getDanceabilityByYear: async () => {
    const response = await axios.get(`${BASE_URL}/danceability-per-year`);
    return response.data;
  },

  getValenceByMode: async () => {
    const response = await axios.get(`${BASE_URL}/positivness-mode`);
    return response.data;
  },

  getDanceabilityAndValence: async () => {
    const response = await axios.get(`${BASE_URL}/danceability-and-valence`);
    return response.data;
  },

  getPopularityByTempo: async () => {
    const response = await axios.get(`${BASE_URL}/popularity-vs-tempo`);
    return response.data;
  },

  getPopularityByLanguage: async () => {
    const response = await axios.get(`${BASE_URL}/popularity-per-language`);
    return response.data;
  },

  // Top 10
  getTop10Popular: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-popular`);
    return response.data;
  },

  getTop10Dance: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-party-tracks`);
    return response.data;
  },

  getTop10Relaxing: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-relaxing-tracks`);
    return response.data;
  },

  getTop10Longest: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-longest-tracks`);
    return response.data;
  }
};
