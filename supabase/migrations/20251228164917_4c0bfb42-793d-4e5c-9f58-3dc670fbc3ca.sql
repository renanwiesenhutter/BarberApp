-- Enum para roles de usuários
CREATE TYPE public.app_role AS ENUM ('super_admin', 'owner', 'manager', 'professional', 'client');

-- Enum para status de agendamentos
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'no_show', 'cancelled');

-- Enum para ciclo de cobrança de assinaturas
CREATE TYPE public.billing_cycle AS ENUM ('monthly', 'quarterly', 'yearly', 'once');

-- Enum para status de assinatura do cliente
CREATE TYPE public.subscription_status AS ENUM ('active', 'paused', 'cancelled', 'expired');

-- Enum para status de pedidos
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

-- Tabela de tenants (barbearias)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  description TEXT,
  instagram TEXT,
  facebook TEXT,
  whatsapp TEXT,
  primary_color TEXT DEFAULT '#f59e0b',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Configurações do tenant (horários, etc)
CREATE TABLE public.tenant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  monday_open TIME,
  monday_close TIME,
  tuesday_open TIME,
  tuesday_close TIME,
  wednesday_open TIME,
  wednesday_close TIME,
  thursday_open TIME,
  thursday_close TIME,
  friday_open TIME,
  friday_close TIME,
  saturday_open TIME,
  saturday_close TIME,
  sunday_open TIME,
  sunday_close TIME,
  min_advance_hours INTEGER DEFAULT 2,
  max_advance_days INTEGER DEFAULT 30,
  slot_duration_minutes INTEGER DEFAULT 30,
  allow_any_professional BOOLEAN DEFAULT true,
  products_enabled BOOLEAN DEFAULT false,
  subscriptions_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id)
);

-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de roles de usuários (separada para segurança)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, tenant_id, role)
);

-- Tabela de profissionais (barbeiros)
CREATE TABLE public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  bio TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  instagram TEXT,
  specialties TEXT[],
  commission_percent DECIMAL(5,2) DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Horários de trabalho dos profissionais
CREATE TABLE public.professional_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_start TIME,
  break_end TIME,
  is_day_off BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(professional_id, day_of_week)
);

-- Categorias de serviços
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de serviços
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Planos de assinatura
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle billing_cycle NOT NULL DEFAULT 'monthly',
  credits INTEGER, -- NULL = ilimitado
  validity_days INTEGER DEFAULT 30,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Serviços incluídos no plano
CREATE TABLE public.plan_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(plan_id, service_id)
);

-- Clientes
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  birth_date DATE,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assinaturas de clientes
CREATE TABLE public.client_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
  status subscription_status NOT NULL DEFAULT 'active',
  credits_remaining INTEGER,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agendamentos
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  client_subscription_id UUID REFERENCES public.client_subscriptions(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Produtos
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT,
  cost_price DECIMAL(10,2) DEFAULT 0,
  sale_price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_alert INTEGER DEFAULT 5,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pedidos
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  status order_status NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Itens do pedido
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categorias de fluxo de caixa
CREATE TABLE public.cashflow_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Entradas de fluxo de caixa
CREATE TABLE public.cashflow_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.cashflow_categories(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  payment_method TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashflow_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashflow_entries ENABLE ROW LEVEL SECURITY;

-- Função para verificar role do usuário (security definer para evitar recursão)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _tenant_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND (tenant_id = _tenant_id OR _tenant_id IS NULL)
      AND role = _role
  )
$$;

-- Função para obter tenant_id do usuário
CREATE OR REPLACE FUNCTION public.get_user_tenant_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = _user_id
$$;

-- Função para verificar se usuário pertence ao tenant
CREATE OR REPLACE FUNCTION public.user_belongs_to_tenant(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND tenant_id = _tenant_id
  )
$$;

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers de updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tenant_settings_updated_at BEFORE UPDATE ON public.tenant_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON public.professionals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_subscriptions_updated_at BEFORE UPDATE ON public.client_subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar perfil quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- Tenants: leitura pública para página de agendamento, escrita apenas para owners/managers
CREATE POLICY "Public can view tenants by slug" ON public.tenants FOR SELECT USING (true);
CREATE POLICY "Owners can update their tenant" ON public.tenants FOR UPDATE USING (
  public.user_belongs_to_tenant(auth.uid(), id) AND 
  (public.has_role(auth.uid(), id, 'owner') OR public.has_role(auth.uid(), id, 'manager'))
);

-- Tenant Settings: leitura pública, escrita para owners/managers
CREATE POLICY "Public can view tenant settings" ON public.tenant_settings FOR SELECT USING (true);
CREATE POLICY "Owners can manage tenant settings" ON public.tenant_settings FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Roles (apenas leitura para o próprio usuário, super_admin gerencia)
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Super admins can manage roles" ON public.user_roles FOR ALL USING (
  public.has_role(auth.uid(), NULL, 'super_admin')
);
CREATE POLICY "Owners can manage tenant roles" ON public.user_roles FOR ALL USING (
  public.has_role(auth.uid(), tenant_id, 'owner')
);

-- Professionals: leitura pública para agendamento
CREATE POLICY "Public can view active professionals" ON public.professionals FOR SELECT USING (active = true);
CREATE POLICY "Tenant members can view all professionals" ON public.professionals FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Owners/Managers can manage professionals" ON public.professionals FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Professional Schedules
CREATE POLICY "Public can view schedules" ON public.professional_schedules FOR SELECT USING (true);
CREATE POLICY "Owners/Managers can manage schedules" ON public.professional_schedules FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id 
    AND public.user_belongs_to_tenant(auth.uid(), p.tenant_id)
    AND (public.has_role(auth.uid(), p.tenant_id, 'owner') OR public.has_role(auth.uid(), p.tenant_id, 'manager'))
  )
);

-- Service Categories
CREATE POLICY "Public can view categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Owners/Managers can manage categories" ON public.service_categories FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Services: leitura pública
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (active = true);
CREATE POLICY "Tenant members can view all services" ON public.services FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Owners/Managers can manage services" ON public.services FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Subscription Plans: leitura pública
CREATE POLICY "Public can view active plans" ON public.subscription_plans FOR SELECT USING (active = true);
CREATE POLICY "Owners/Managers can manage plans" ON public.subscription_plans FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Plan Services
CREATE POLICY "Public can view plan services" ON public.plan_services FOR SELECT USING (true);
CREATE POLICY "Owners/Managers can manage plan services" ON public.plan_services FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.subscription_plans sp 
    WHERE sp.id = plan_id 
    AND public.user_belongs_to_tenant(auth.uid(), sp.tenant_id)
    AND (public.has_role(auth.uid(), sp.tenant_id, 'owner') OR public.has_role(auth.uid(), sp.tenant_id, 'manager'))
  )
);

-- Clients
CREATE POLICY "Tenant members can view clients" ON public.clients FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Tenant members can manage clients" ON public.clients FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager') OR public.has_role(auth.uid(), tenant_id, 'professional'))
);

-- Client Subscriptions
CREATE POLICY "Tenant members can view client subscriptions" ON public.client_subscriptions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.clients c 
    WHERE c.id = client_id 
    AND public.user_belongs_to_tenant(auth.uid(), c.tenant_id)
  )
);
CREATE POLICY "Owners/Managers can manage client subscriptions" ON public.client_subscriptions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.clients c 
    WHERE c.id = client_id 
    AND public.user_belongs_to_tenant(auth.uid(), c.tenant_id)
    AND (public.has_role(auth.uid(), c.tenant_id, 'owner') OR public.has_role(auth.uid(), c.tenant_id, 'manager'))
  )
);

-- Appointments
CREATE POLICY "Tenant members can view appointments" ON public.appointments FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Tenant members can manage appointments" ON public.appointments FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager') OR public.has_role(auth.uid(), tenant_id, 'professional'))
);
CREATE POLICY "Public can create appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- Products: leitura pública quando habilitado
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Owners/Managers can manage products" ON public.products FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Orders
CREATE POLICY "Tenant members can view orders" ON public.orders FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Owners/Managers can manage orders" ON public.orders FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);
CREATE POLICY "Public can create orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Order Items
CREATE POLICY "Tenant members can view order items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders o 
    WHERE o.id = order_id 
    AND public.user_belongs_to_tenant(auth.uid(), o.tenant_id)
  )
);
CREATE POLICY "Public can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Cashflow Categories
CREATE POLICY "Tenant members can view cashflow categories" ON public.cashflow_categories FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Owners/Managers can manage cashflow categories" ON public.cashflow_categories FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);

-- Cashflow Entries
CREATE POLICY "Tenant members can view cashflow entries" ON public.cashflow_entries FOR SELECT USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id)
);
CREATE POLICY "Owners/Managers can manage cashflow entries" ON public.cashflow_entries FOR ALL USING (
  public.user_belongs_to_tenant(auth.uid(), tenant_id) AND 
  (public.has_role(auth.uid(), tenant_id, 'owner') OR public.has_role(auth.uid(), tenant_id, 'manager'))
);