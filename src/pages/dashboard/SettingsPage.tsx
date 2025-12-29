import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Settings, 
  Store,
  Clock,
  Bell,
  CreditCard,
  Link as LinkIcon,
  Camera,
  Copy,
  ExternalLink,
  Palette,
  Globe
} from "lucide-react";
import { toast } from "sonner";

const weekDays = [
  { key: "seg", label: "Segunda-feira" },
  { key: "ter", label: "Terça-feira" },
  { key: "qua", label: "Quarta-feira" },
  { key: "qui", label: "Quinta-feira" },
  { key: "sex", label: "Sexta-feira" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" }
];

export default function SettingsPage() {
  const [slug] = useState("barbearia-premium");
  
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua barbearia e ajuste as configurações
          </p>
        </div>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="business" className="gap-2">
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Negócio</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Horários</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Pagamentos</span>
            </TabsTrigger>
          </TabsList>

          {/* Business Settings */}
          <TabsContent value="business">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Informações do Negócio</CardTitle>
                  <CardDescription>
                    Dados principais da sua barbearia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <Button variant="outline">
                        <Camera className="w-4 h-4" />
                        Alterar Logo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG ou SVG. Máximo 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nome do Negócio</Label>
                      <Input id="businessName" defaultValue="Barbearia Premium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone/WhatsApp</Label>
                      <Input id="phone" defaultValue="(11) 99999-9999" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" defaultValue="Rua das Barbearias, 123 - Centro" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" defaultValue="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" defaultValue="SP" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      rows={3}
                      defaultValue="A melhor barbearia da região, com profissionais experientes e ambiente exclusivo."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button variant="accent">Salvar Alterações</Button>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Personalização
                  </CardTitle>
                  <CardDescription>
                    Cores e aparência do seu site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Cor Principal</Label>
                      <div className="flex gap-2">
                        <Input id="primaryColor" defaultValue="#C69B5F" />
                        <div className="w-10 h-10 rounded-lg bg-accent border" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" defaultValue="@barbeariapremium" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Schedule Settings */}
          <TabsContent value="schedule">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Horário de Funcionamento</CardTitle>
                  <CardDescription>
                    Configure os horários de abertura e fechamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weekDays.map(day => (
                    <div key={day.key} className="flex items-center gap-4 py-2">
                      <Switch defaultChecked={day.key !== "dom"} />
                      <span className="w-32 font-medium">{day.label}</span>
                      <Input 
                        type="time" 
                        defaultValue="09:00" 
                        className="w-28"
                        disabled={day.key === "dom"}
                      />
                      <span className="text-muted-foreground">até</span>
                      <Input 
                        type="time" 
                        defaultValue={day.key === "sab" ? "14:00" : "18:00"} 
                        className="w-28"
                        disabled={day.key === "dom"}
                      />
                    </div>
                  ))}
                  <div className="flex justify-end pt-4">
                    <Button variant="accent">Salvar Horários</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Links Settings */}
          <TabsContent value="links">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Links do Seu Negócio
                  </CardTitle>
                  <CardDescription>
                    Compartilhe estes links com seus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Booking Link */}
                  <div className="p-4 rounded-lg bg-secondary/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Link de Agendamento</p>
                        <p className="text-sm text-muted-foreground">
                          Clientes acessam este link para agendar
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/b/${slug}`} target="_blank">
                          <ExternalLink className="w-4 h-4" />
                          Abrir
                        </a>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={`${window.location.origin}/b/${slug}`} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => copyLink(`${window.location.origin}/b/${slug}`)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Site Link */}
                  <div className="p-4 rounded-lg bg-secondary/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Site da Barbearia</p>
                        <p className="text-sm text-muted-foreground">
                          Página institucional com informações
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/site/${slug}`} target="_blank">
                          <ExternalLink className="w-4 h-4" />
                          Abrir
                        </a>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={`${window.location.origin}/site/${slug}`} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => copyLink(`${window.location.origin}/site/${slug}`)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Slug Configuration */}
                  <div className="pt-4 border-t space-y-3">
                    <Label htmlFor="slug">Identificador único (slug)</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="slug"
                        defaultValue={slug}
                        placeholder="minha-barbearia"
                      />
                      <Button variant="outline">Alterar</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este identificador aparece nas URLs do seu negócio
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Configure quando e como enviar notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Confirmação de agendamento</p>
                      <p className="text-sm text-muted-foreground">
                        Enviar email quando um agendamento for criado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Lembrete de agendamento</p>
                      <p className="text-sm text-muted-foreground">
                        Enviar lembrete 1 dia antes do agendamento
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Cancelamento</p>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando um agendamento for cancelado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Notificações por WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        Enviar notificações via WhatsApp (em breve)
                      </p>
                    </div>
                    <Switch disabled />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Payments Settings */}
          <TabsContent value="payments">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Formas de Pagamento</CardTitle>
                  <CardDescription>
                    Configure as formas de pagamento aceitas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Dinheiro</p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar pagamento em dinheiro
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">PIX</p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar pagamento via PIX
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar cartão de crédito
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Cartão de Débito</p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar cartão de débito
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
