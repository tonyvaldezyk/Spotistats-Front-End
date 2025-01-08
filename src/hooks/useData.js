import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSpotifyData = () => {
  return useQuery({
    queryKey: ["spotifyData"],
    queryFn: async () => {
      const { data } = await axios.get("/api");
      return data;
    },
  });
};
