import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ScenarioPicker from "@/pages/scenario-picker";
import ContextUpload from "@/pages/context-upload";
import InventorySelection from "@/pages/inventory-selection";
import GlobalSearch from "@/pages/global-search";
import MyInventory from "@/pages/my-inventory";
import AvatarSelection from "@/pages/avatar-selection";
import StyleDiscovery from "@/pages/style-discovery";
import ProductFeed from "@/pages/product-feed";
import { GlobalChatLayout } from "@/components/global-chat-layout";

function Router() {
  return (
    <GlobalChatLayout>
      <Switch>
        <Route path="/" component={ScenarioPicker} />
        <Route path="/upload-context" component={ContextUpload} />
        <Route path="/inventory-selection" component={InventorySelection} />
        <Route path="/global-search" component={GlobalSearch} />
        <Route path="/my-inventory" component={MyInventory} />
        <Route path="/avatar-selection" component={AvatarSelection} />
        <Route path="/style-discovery" component={StyleDiscovery} />
        <Route path="/product-feed" component={ProductFeed} />
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