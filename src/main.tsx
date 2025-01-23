import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "./axios.ts";

import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url, params] = queryKey;
        const { data } = await axios.get(`${url}`, { params });
        return data;
      },
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);
