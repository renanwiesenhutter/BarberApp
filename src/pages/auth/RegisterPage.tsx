import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Mail, Lock, User, ArrowRight, Building2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  businessName: z.string().min(2, "Nome da barbearia deve ter pelo menos 2 caracteres"),
  phone: z.string().optional(),
});

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    phone: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep1 = () => {
    const result = registerSchema.pick({ name: true, email: true, password: true }).safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate full form
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // 1. Create user account
      const { error: signUpError } = await signUp(
        formData.email, 
        formData.password, 
        formData.name
      );

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          toast.error("Este e-mail já está cadastrado");
        } else {
          toast.error("Erro ao criar conta. Tente novamente.");
        }
        setIsLoading(false);
        return;
      }

      // 2. Get the new user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error("Erro ao obter sessão. Faça login novamente.");
        navigate("/login");
        return;
      }

      // 3. Create the tenant (barbershop)
      const slug = generateSlug(formData.businessName);
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .insert({
          name: formData.businessName,
          slug: slug,
          phone: formData.phone || null,
          whatsapp: formData.phone || null,
        })
        .select()
        .single();

      if (tenantError) {
        console.error("Tenant creation error:", tenantError);
        toast.error("Erro ao criar barbearia. Tente novamente.");
        setIsLoading(false);
        return;
      }

      // 4. Update user profile with tenant_id
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          tenant_id: tenant.id,
          full_name: formData.name,
          phone: formData.phone || null,
        })
        .eq("id", session.user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
      }

      // 5. Assign owner role to user
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: session.user.id,
          tenant_id: tenant.id,
          role: "owner",
        });

      if (roleError) {
        console.error("Role assignment error:", roleError);
      }

      // 6. Create default tenant settings
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

      toast.success("Conta criada com sucesso! Bem-vindo ao BarberPro!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Erro inesperado. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-primary-foreground">BarberPro</span>
          </Link>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-4xl font-bold text-primary-foreground mb-6">
              Comece a transformar sua barbearia hoje
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Configure sua conta em minutos e tenha acesso a todas as ferramentas 
              para gerenciar seu negócio de forma profissional.
            </p>
            <div className="space-y-4">
              {[
                "Agendamento online 24/7",
                "Gestão financeira completa",
                "Site profissional automático",
                "Suporte dedicado"
              ].map((item, index) => (
                <motion.div 
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-accent-foreground" />
                  </div>
                  <span className="text-primary-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2024 BarberPro. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-2xl">BarberPro</span>
          </div>

          <Card variant="elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Criar sua conta</CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Preencha seus dados pessoais" 
                  : "Agora, os dados da sua barbearia"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s 
                        ? "bg-gradient-warm text-accent-foreground" 
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {s}
                    </div>
                    {s < 2 && (
                      <div className={`w-12 h-1 rounded-full transition-colors ${
                        step > s ? "bg-accent" : "bg-secondary"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="Seu nome"
                          className="pl-10"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Mínimo 6 caracteres"
                          className="pl-10"
                          value={formData.password}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                    </div>

                    <Button 
                      type="button" 
                      variant="accent" 
                      className="w-full"
                      onClick={handleNextStep}
                      disabled={isLoading}
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nome da barbearia</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="Nome do seu negócio"
                          className="pl-10"
                          value={formData.businessName}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-sm text-destructive">{errors.businessName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone/WhatsApp (opcional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        disabled={isLoading}
                      >
                        Voltar
                      </Button>
                      <Button type="submit" variant="accent" className="flex-1" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Criando...
                          </>
                        ) : (
                          "Criar minha conta"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-accent hover:underline font-medium">
                  Fazer login
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
