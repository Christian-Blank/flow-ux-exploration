import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ScenarioPicker from "@/pages/scenario-picker";
import ContextUpload from "@/pages/context-upload";
import { GlobalChatLayout } from "@/components/global-chat-layout";

function Router() {
  return (
    <GlobalChatLayout>
      <Switch>
        <Route path="/" component={ScenarioPicker} />
        <Route path="/upload-context" component={ContextUpload} />
        <Route component={NotFound} />
      </Switch>
    </GlobalChatLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;