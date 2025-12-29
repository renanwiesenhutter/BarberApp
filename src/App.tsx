import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AgendaPage from "./pages/dashboard/AgendaPage";
import ClientsPage from "./pages/dashboard/ClientsPage";
import ServicesPage from "./pages/dashboard/ServicesPage";
import ProfessionalsPage from "./pages/dashboard/ProfessionalsPage";
import FinancialPage from "./pages/dashboard/FinancialPage";
import ProductsPage from "./pages/dashboard/ProductsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import MySitePage from "./pages/dashboard/MySitePage";
import PublicBookingPage from "./pages/public/BookingPage";
import TenantSitePage from "./pages/public/TenantSitePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/agenda" element={
              <ProtectedRoute><AgendaPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/clientes" element={
              <ProtectedRoute><ClientsPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/servicos" element={
              <ProtectedRoute><ServicesPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/profissionais" element={
              <ProtectedRoute><ProfessionalsPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/financeiro" element={
              <ProtectedRoute><FinancialPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/produtos" element={
              <ProtectedRoute><ProductsPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/relatorios" element={
              <ProtectedRoute><ReportsPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/configuracoes" element={
              <ProtectedRoute><SettingsPage /></ProtectedRoute>
            } />
            <Route path="/dashboard/site" element={
              <ProtectedRoute><MySitePage /></ProtectedRoute>
            } />
            
            {/* Public tenant pages */}
            <Route path="/b/:slug" element={<PublicBookingPage />} />
            <Route path="/site/:slug" element={<TenantSitePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
