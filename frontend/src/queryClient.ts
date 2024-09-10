// queryClient.ts
import { QueryClient } from "@tanstack/react-query";

// Create a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      retry: 3, // Retry failed requests up to 3 times
    },
    mutations: {
      // Mutation-specific options can be set here if needed
    },
  },
});

export default queryClient;
