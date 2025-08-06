import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '../utils/api';

// Global query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 401 errors
        if (error?.response?.status === 401) return false;
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

// Custom query function that uses our axios instance
export const authenticatedQuery = async ({ queryKey }) => {
  const [url] = queryKey;
  const { data } = await api.get(url);
  return data;
};

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}