import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const queryCache = queryClient.getQueryCache();

export { queryCache };

export default queryClient;
