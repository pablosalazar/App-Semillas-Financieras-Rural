import { RouterProvider } from "react-router";

import {
  AuthProvider,
  LearningProgressProvider,
  AssessmentProvider,
  SettingsProvider,
} from "@/context";
import router from "@/router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { OfflineBanner } from "@/shared/components/ui/OfflineBanner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <LearningProgressProvider>
            <AssessmentProvider>
              <OfflineBanner />
              <Toaster position="top-right" richColors closeButton />
              <RouterProvider router={router} />
            </AssessmentProvider>
          </LearningProgressProvider>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
