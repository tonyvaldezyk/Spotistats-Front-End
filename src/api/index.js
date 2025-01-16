import { apiClient } from './client';

export const spotifyApi = {
  // Analyses temporelles
  getSongsByYear: async () => {
    const response = await apiClient.get(`/songs-by-year`);
    return response.data;
  },

  getArtistByYear: async (year) => {
    const response = await apiClient.get(`/artist/${year}`);
    return response.data;
  },

  // Analyses musicales
  getAcousticnessPerYear: async () => {
    const response = await apiClient.get(`/acousticness-per-year`);
    return response.data;
  },

  getTempoPerYear: async () => {
    const response = await apiClient.get(`/tempo-per-year`);
    return response.data;
  },

  getDanceabilityPerYear: async () => {
    const response = await apiClient.get(`/danceability-per-year`);
    return response.data;
  },

  getDanceabilityAndValence: async () => {
    const response = await apiClient.get(`/danceability-and-valence`);
    return response.data;
  },

  getPopularityVsTempo: async () => {
    const response = await apiClient.get(`/popularity-vs-tempo`);
    return response.data;
  },

  getPopularityPerLanguage: async () => {
    const response = await apiClient.get(`/popularity-per-language`);
    return response.data;
  },

  // Top 10
  getTop10Popular: async () => {
    const response = await apiClient.get(`/top-10-popular`);
    return response.data;
  },

  getTop10Dance: async () => {
    const response = await apiClient.get(`/top-10-dance`);
    return response.data;
  },

  getTop10Relaxing: async () => {
    const response = await apiClient.get(`/top-10-relaxing`);
    return response.data;
  },

  getTop10Longest: async () => {
    const response = await apiClient.get(`/top-10-longest`);
    return response.data;
  },

  getMode: async () => {
    const response = await apiClient.get(`/mode`);
    return response.data;
  },

  getKey: async () => {
    const response = await apiClient.get(`/key`);
    return response.data;
  },
};
