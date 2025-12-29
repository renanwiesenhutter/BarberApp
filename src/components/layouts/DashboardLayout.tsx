import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  CreditCard, 
  Package, 
  Settings,
  ChevronLeft,
  Menu,
  Bell,
  Search,
  LogOut,
  Store,
  BarChart3,
  UserCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agenda", href: "/dashboard/agenda", icon: Calendar },
  { name: "Clientes", href: "/dashboard/clientes", icon: Users },
  { name: "Serviços", href: "/dashboard/servicos", icon: Scissors },
  { name: "Profissionais", href: "/dashboard/profissionais", icon: UserCircle },
  { name: "Financeiro", href: "/dashboard/financeiro", icon: CreditCard },
  { name: "Produtos", href: "/dashboard/produtos", icon: Package },
  { name: "Relatórios", href: "/dashboard/relatorios", icon: BarChart3 },
  { name: "Meu Site", href: "/dashboard/site", icon: Store },
  { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ full_name: string | null; tenant_name: string | null }>({ full_name: null, tenant_name: null });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      
      // Check if there's pending tenant setup data
      const pendingTenantData = localStorage.getItem("pendingTenantSetup");
      
      if (pendingTenantData) {
        try {
          const tenantData = JSON.parse(pendingTenantData);
          
          // Try to create the tenant now that user is authenticated
          const { data: tenant, error: tenantError } = await supabase
            .from("tenants")
            .insert({
              name: tenantData.name,
              slug: tenantData.slug,
              phone: tenantData.phone,
              whatsapp: tenantData.whatsapp,
            })
            .select()
            .single();
          
          if (!tenantError && tenant) {
            // Update user profile with tenant_id
            await supabase
              .from("profiles")
              .update({ 
                tenant_id: tenant.id,
                full_name: tenantData.userName,
                phone: tenantData.userPhone,
              })
              .eq("id", user.id);
            
            // Assign owner role
            await supabase
              .from("user_roles")
              .insert({
                user_id: user.id,
                tenant_id: tenant.id,
                role: "owner",
              });
            
            // Create default tenant settings
            await supabase
              .from("tenant_settings")
              .insert({
                tenant_id: tenant.id,
                monday_open: "09:00",
                monday_close: "19:00",
                tuesday_open: "09:00",
                tuesday_close: "19:00",
                wednesday_open: "09:00",
                wednesday_close: "19:00",
                thursday_open: "09:00",
                thursday_close: "19:00",
                friday_open: "09:00",
                friday_close: "19:00",
                saturday_open: "09:00",
                saturday_close: "17:00",
              });
            
            // Remove pending data
            localStorage.removeItem("pendingTenantSetup");
            toast.success("Configuração da barbearia concluída com sucesso!");
          }
        } catch (error) {
          console.error("Error completing tenant setup:", error);
        }
      }
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, tenant_id")
        .eq("id", user.id)
        .maybeSingle();
      
      if (profile?.tenant_id) {
        const { data: tenant } = await supabase
          .from("tenants")
          .select("name")
          .eq("id", profile.tenant_id)
          .maybeSingle();
        
        setUserProfile({
          full_name: profile.full_name,
          tenant_name: tenant?.name || null
        });
      } else {
        setUserProfile({
          full_name: profile?.full_name || null,
          tenant_name: null
        });
      }
    }
    
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    toast.success("Você saiu da sua conta");
    navigate("/login");
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col bg-card border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-lg">BarberPro</span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon-sm" 
            onClick={() => setCollapsed(!collapsed)}
            className={collapsed ? "mx-auto" : ""}
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            
            return (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-accent/10 text-accent" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t">
          {collapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-full"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-sm font-medium">{getInitials(userProfile.full_name)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userProfile.full_name || "Usuário"}</p>
                <p className="text-xs text-muted-foreground truncate">{userProfile.tenant_name || "Minha Barbearia"}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon-sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.aside 
            className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="font-display font-bold text-lg">BarberPro</span>
              </Link>
              <Button variant="ghost" size="icon-sm" onClick={() => setMobileMenuOpen(false)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            <nav className="flex-1 py-4 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar clientes, serviços..." 
                className="border-0 bg-transparent focus-visible:ring-0 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <div className="lg:hidden w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-medium">{getInitials(userProfile.full_name)}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
