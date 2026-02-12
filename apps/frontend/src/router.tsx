import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundry } from "./components/default-catch-boundry";
import { NotFound } from "./components/not-found";
import { toast } from "sonner";

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
    mutationCache: new MutationCache({
      onError: (error: unknown, _1, _2, mutation) => {
        if (mutation?.meta?.disableGlobalErrorHandling) return;
        if (typeof error === "string") {
          toast.error(error);
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          toast.error((error as { message: string }).message);
        }
      },
    }),
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
