import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewsDetail from "./pages/NewsDetail";
import Denuncia from "./pages/Denuncia";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Adm from "./pages/Adm";
import Vereadores from "./pages/Vereadores";
import Parceiros from "./pages/Parceiros";
import Categoria from "./pages/Categoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/noticia/:id" element={<NewsDetail />} />
          <Route path="/denuncia" element={<Denuncia />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/vereadores" element={<Vereadores />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/categoria/:categoria" element={<Categoria />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
