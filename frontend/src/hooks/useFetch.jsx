import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useFetch(url = "/", params = {}, key = "rep", dependencies = []) {
  // Queries
  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:4000${url}`,
        data: {
          ...params,
        },
      });
      return response.data;
    },
    enabled: !dependencies.includes(false),
    retryOnMount: false,
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export { useFetch };
