export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          client_id: string
          client_subscription_id: string | null
          created_at: string
          duration_minutes: number
          id: string
          notes: string | null
          price: number
          professional_id: string | null
          scheduled_at: string
          service_id: string
          status: Database["public"]["Enums"]["appointment_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          client_subscription_id?: string | null
          created_at?: string
          duration_minutes: number
          id?: string
          notes?: string | null
          price: number
          professional_id?: string | null
          scheduled_at: string
          service_id: string
          status?: Database["public"]["Enums"]["appointment_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          client_subscription_id?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          price?: number
          professional_id?: string | null
          scheduled_at?: string
          service_id?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_client_subscription_id_fkey"
            columns: ["client_subscription_id"]
            isOneToOne: false
            referencedRelation: "client_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cashflow_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          tenant_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          tenant_id: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          tenant_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cashflow_categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cashflow_entries: {
        Row: {
          amount: number
          appointment_id: string | null
          category_id: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string | null
          id: string
          order_id: string | null
          payment_method: string | null
          tenant_id: string
          type: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          order_id?: string | null
          payment_method?: string | null
          tenant_id: string
          type: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          order_id?: string | null
          payment_method?: string | null
          tenant_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cashflow_entries_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashflow_entries_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cashflow_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashflow_entries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashflow_entries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      client_subscriptions: {
        Row: {
          cancelled_at: string | null
          client_id: string
          created_at: string
          credits_remaining: number | null
          expires_at: string | null
          id: string
          plan_id: string
          started_at: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          cancelled_at?: string | null
          client_id: string
          created_at?: string
          credits_remaining?: number | null
          expires_at?: string | null
          id?: string
          plan_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          cancelled_at?: string | null
          client_id?: string
          created_at?: string
          credits_remaining?: number | null
          expires_at?: string | null
          id?: string
          plan_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_subscriptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          birth_date: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          tenant_id: string
          updated_at: string
          user_id: string | null
          whatsapp: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          tenant_id: string
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          tenant_id?: string
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          quantity: number
          total: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          total: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["order_status"]
          tenant_id: string
          total: number
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          tenant_id: string
          total?: number
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          tenant_id?: string
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_services: {
        Row: {
          created_at: string
          id: string
          plan_id: string
          service_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          plan_id: string
          service_id: string
        }
        Update: {
          created_at?: string
          id?: string
          plan_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_services_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          cost_price: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          min_stock_alert: number | null
          name: string
          sale_price: number
          sku: string | null
          stock_quantity: number | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          min_stock_alert?: number | null
          name: string
          sale_price: number
          sku?: string | null
          stock_quantity?: number | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          min_stock_alert?: number | null
          name?: string
          sale_price?: number
          sku?: string | null
          stock_quantity?: number | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_schedules: {
        Row: {
          break_end: string | null
          break_start: string | null
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_day_off: boolean | null
          professional_id: string
          start_time: string
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_day_off?: boolean | null
          professional_id: string
          start_time: string
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_day_off?: boolean | null
          professional_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_schedules_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          active: boolean | null
          avatar_url: string | null
          bio: string | null
          commission_percent: number | null
          created_at: string
          email: string | null
          id: string
          instagram: string | null
          name: string
          phone: string | null
          specialties: string[] | null
          tenant_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          commission_percent?: number | null
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          name: string
          phone?: string | null
          specialties?: string[] | null
          tenant_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          commission_percent?: number | null
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          name?: string
          phone?: string | null
          specialties?: string[] | null
          tenant_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sort_order?: number | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean | null
          category_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          image_url: string | null
          name: string
          price: number
          tenant_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          image_url?: string | null
          name: string
          price?: number
          tenant_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          active: boolean | null
          billing_cycle: Database["public"]["Enums"]["billing_cycle"]
          created_at: string
          credits: number | null
          description: string | null
          id: string
          name: string
          price: number
          tenant_id: string
          updated_at: string
          validity_days: number | null
        }
        Insert: {
          active?: boolean | null
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          credits?: number | null
          description?: string | null
          id?: string
          name: string
          price: number
          tenant_id: string
          updated_at?: string
          validity_days?: number | null
        }
        Update: {
          active?: boolean | null
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          credits?: number | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          tenant_id?: string
          updated_at?: string
          validity_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_plans_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_settings: {
        Row: {
          allow_any_professional: boolean | null
          created_at: string
          friday_close: string | null
          friday_open: string | null
          id: string
          max_advance_days: number | null
          min_advance_hours: number | null
          monday_close: string | null
          monday_open: string | null
          products_enabled: boolean | null
          saturday_close: string | null
          saturday_open: string | null
          slot_duration_minutes: number | null
          subscriptions_enabled: boolean | null
          sunday_close: string | null
          sunday_open: string | null
          tenant_id: string
          thursday_close: string | null
          thursday_open: string | null
          tuesday_close: string | null
          tuesday_open: string | null
          updated_at: string
          wednesday_close: string | null
          wednesday_open: string | null
        }
        Insert: {
          allow_any_professional?: boolean | null
          created_at?: string
          friday_close?: string | null
          friday_open?: string | null
          id?: string
          max_advance_days?: number | null
          min_advance_hours?: number | null
          monday_close?: string | null
          monday_open?: string | null
          products_enabled?: boolean | null
          saturday_close?: string | null
          saturday_open?: string | null
          slot_duration_minutes?: number | null
          subscriptions_enabled?: boolean | null
          sunday_close?: string | null
          sunday_open?: string | null
          tenant_id: string
          thursday_close?: string | null
          thursday_open?: string | null
          tuesday_close?: string | null
          tuesday_open?: string | null
          updated_at?: string
          wednesday_close?: string | null
          wednesday_open?: string | null
        }
        Update: {
          allow_any_professional?: boolean | null
          created_at?: string
          friday_close?: string | null
          friday_open?: string | null
          id?: string
          max_advance_days?: number | null
          min_advance_hours?: number | null
          monday_close?: string | null
          monday_open?: string | null
          products_enabled?: boolean | null
          saturday_close?: string | null
          saturday_open?: string | null
          slot_duration_minutes?: number | null
          subscriptions_enabled?: boolean | null
          sunday_close?: string | null
          sunday_open?: string | null
          tenant_id?: string
          thursday_close?: string | null
          thursday_open?: string | null
          tuesday_close?: string | null
          tuesday_open?: string | null
          updated_at?: string
          wednesday_close?: string | null
          wednesday_open?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          description: string | null
          email: string | null
          facebook: string | null
          id: string
          instagram: string | null
          logo_url: string | null
          name: string
          phone: string | null
          primary_color: string | null
          slug: string
          state: string | null
          updated_at: string
          whatsapp: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          primary_color?: string | null
          slug: string
          state?: string | null
          updated_at?: string
          whatsapp?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          primary_color?: string | null
          slug?: string
          state?: string | null
          updated_at?: string
          whatsapp?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _tenant_id: string
          _user_id: string
        }
        Returns: boolean
      }
      user_belongs_to_tenant: {
        Args: { _tenant_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "owner" | "manager" | "professional" | "client"
      appointment_status:
        | "pending"
        | "confirmed"
        | "completed"
        | "no_show"
        | "cancelled"
      billing_cycle: "monthly" | "quarterly" | "yearly" | "once"
      order_status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
      subscription_status: "active" | "paused" | "cancelled" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "owner", "manager", "professional", "client"],
      appointment_status: [
        "pending",
        "confirmed",
        "completed",
        "no_show",
        "cancelled",
      ],
      billing_cycle: ["monthly", "quarterly", "yearly", "once"],
      order_status: ["pending", "paid", "shipped", "delivered", "cancelled"],
      subscription_status: ["active", "paused", "cancelled", "expired"],
    },
  },
} as const
