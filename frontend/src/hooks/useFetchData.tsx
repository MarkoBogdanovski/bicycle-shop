import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem } from "@/types"; // Import your DataItem type
import { API_URL } from "@/utils/env";

const fetchData = async (endpoint: string): Promise<DataItem[]> => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const useFetchData = (endpoint: string): UseQueryResult => {
  return useQuery<DataItem[], Error>({
    queryKey: ["data", endpoint],
    queryFn: () => fetchData(endpoint),
    staleTime: 60000, // 1 minute
    retry: 2, // Retry failed requests up to 3 times
  });
};

export default useFetchData;
