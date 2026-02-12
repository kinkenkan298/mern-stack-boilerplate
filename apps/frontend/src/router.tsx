import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundry } from "./components/default-catch-boundry";
import { NotFound } from "./components/not-found";

// Create a new router instance
export const getRouter = () => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 60 * 1000 * 10,
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  const router = routerWithQueryClient(
    createRouter({
      routeTree,
      context: { queryClient },

      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      scrollRestoration: true,
      defaultErrorComponent: DefaultCatchBoundry,
      defaultNotFoundComponent: () => <NotFound />,
    }),
    queryClient,
  );

  return router;
};
