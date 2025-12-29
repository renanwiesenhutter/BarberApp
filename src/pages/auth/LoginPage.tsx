import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    const { error } = await signIn(formData.email, formData.password);

    if (error) {
      setIsLoading(false);
      if (error.message.includes("Invalid login credentials")) {
        toast.error("E-mail ou senha incorretos");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Confirme seu e-mail antes de fazer login");
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
      return;
    }

    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-2xl">BarberPro</span>
          </Link>
        </div>

        <Card variant="elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Sua senha"
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

              <Button type="submit" variant="accent" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="text-accent hover:underline font-medium">
                Criar conta grátis
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
