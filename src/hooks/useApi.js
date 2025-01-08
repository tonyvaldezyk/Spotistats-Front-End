import { useQuery } from "@tanstack/react-query";
import { spotifyApi } from "../api";

// Analyses temporelles
export const useTracksByYear = () => {
  return useQuery({
    queryKey: ["tracksByYear"],
    queryFn: spotifyApi.getTracksByYear,
  });
};

export const useTracksByArtistYear = () => {
  return useQuery({
    queryKey: ["tracksByArtistYear"],
    queryFn: spotifyApi.getTracksByArtistYear,
  });
};

// Analyses musicales par année
export const useAcousticnessByYear = () => {
  return useQuery({
    queryKey: ["acousticnessByYear"],
    queryFn: spotifyApi.getAcousticnessByYear,
  });
};

export const useDanceabilityByYear = () => {
  return useQuery({
    queryKey: ["danceabilityByYear"],
    queryFn: spotifyApi.getDanceabilityByYear,
  });
};

// Analyses de caractéristiques
export const useValenceByMode = () => {
  return useQuery({
    queryKey: ["valenceByMode"],
    queryFn: spotifyApi.getValenceByMode,
  });
};

export const useDanceabilityByValence = () => {
  return useQuery({
    queryKey: ["danceabilityByValence"],
    queryFn: spotifyApi.getDanceabilityByValence,
  });
};

export const usePopularityByTempo = () => {
  return useQuery({
    queryKey: ["popularityByTempo"],
    queryFn: spotifyApi.getPopularityByTempo,
  });
};

export const usePopularityByLanguage = () => {
  return useQuery({
    queryKey: ["popularityByLanguage"],
    queryFn: spotifyApi.getPopularityByLanguage,
  });
};

// Top 10
export const useTop10Popular = () => {
  return useQuery({
    queryKey: ["top10Popular"],
    queryFn: spotifyApi.getTop10Popular,
  });
};

export const useTop10Dance = () => {
  return useQuery({
    queryKey: ["top10Dance"],
    queryFn: spotifyApi.getTop10Dance,
  });
};

export const useTop10Relaxing = () => {
  return useQuery({
    queryKey: ["top10Relaxing"],
    queryFn: spotifyApi.getTop10Relaxing,
  });
};

export const useTop10Longest = () => {
  return useQuery({
    queryKey: ["top10Longest"],
    queryFn: spotifyApi.getTop10Longest,
  });
};

// Analyses croisées
export const useDanceabilityAndValence = () => {
  return useQuery({
    queryKey: ["danceabilityAndValence"],
    queryFn: spotifyApi.getDanceabilityAndValence,
  });
};
