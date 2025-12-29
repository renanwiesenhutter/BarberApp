import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Scissors, 
  Plus, 
  Search, 
  Clock, 
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  CreditCard,
  Repeat,
  Users,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockServices = [
  { 
    id: 1, 
    name: "Corte Tradicional", 
    category: "Cabelo",
    duration: 30,
    price: 45.00,
    description: "Corte clássico com máquina e tesoura",
    active: true
  },
  { 
    id: 2, 
    name: "Corte Degradê", 
    category: "Cabelo",
    duration: 45,
    price: 55.00,
    description: "Corte moderno com degradê nas laterais",
    active: true
  },
  { 
    id: 3, 
    name: "Barba Completa", 
    category: "Barba",
    duration: 30,
    price: 35.00,
    description: "Aparar, modelar e navalhado",
    active: true
  },
  { 
    id: 4, 
    name: "Corte + Barba", 
    category: "Combo",
    duration: 60,
    price: 75.00,
    description: "Combo completo com desconto",
    active: true
  },
  { 
    id: 5, 
    name: "Sobrancelha", 
    category: "Outros",
    duration: 15,
    price: 15.00,
    description: "Design e limpeza de sobrancelha",
    active: true
  },
  { 
    id: 6, 
    name: "Relaxamento", 
    category: "Tratamento",
    duration: 90,
    price: 120.00,
    description: "Tratamento para alisar os fios",
    active: false
  }
];

const mockSubscriptions = [
  {
    id: 1,
    name: "Plano Mensal Corte",
    description: "4 cortes por mês com desconto",
    price: 150.00,
    billingCycle: "monthly",
    credits: 4,
    services: ["Corte Tradicional", "Corte Degradê"],
    subscribers: 12,
    active: true
  },
  {
    id: 2,
    name: "Plano VIP",
    description: "Cortes e barbas ilimitados",
    price: 250.00,
    billingCycle: "monthly",
    credits: null, // ilimitado
    services: ["Corte Tradicional", "Corte Degradê", "Barba Completa"],
    subscribers: 8,
    active: true
  },
  {
    id: 3,
    name: "Pacote 10 Cortes",
    description: "Compre 10 cortes com 20% de desconto",
    price: 360.00,
    billingCycle: "once",
    credits: 10,
    services: ["Corte Tradicional"],
    subscribers: 5,
    active: true
  }
];

const categories = ["Cabelo", "Barba", "Combo", "Tratamento", "Outros"];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeServices = mockServices.filter(s => s.active).length;
  const activeSubscriptions = mockSubscriptions.filter(s => s.active).length;
  const totalSubscribers = mockSubscriptions.reduce((acc, s) => acc + s.subscribers, 0);

  const toggleServiceSelection = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* ====== SEÇÃO DE SERVIÇOS ====== */}
        <section className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold">Serviços</h1>
              <p className="text-muted-foreground">
                Gerencie os serviços oferecidos pela sua barbearia
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="accent">
                  <Plus className="w-4 h-4" />
                  Novo Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Serviço</DialogTitle>
                  <DialogDescription>
                    Adicione um novo serviço ao catálogo
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do serviço</Label>
                    <Input id="name" placeholder="Ex: Corte Degradê Premium" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração (min)</Label>
                      <Input id="duration" type="number" placeholder="45" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input id="price" type="number" step="0.01" placeholder="55.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva o serviço..."
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active">Serviço ativo</Label>
                    <Switch id="active" defaultChecked />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="accent">
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Serviços</p>
                    <p className="text-2xl font-bold">{mockServices.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Serviços Ativos</p>
                    <p className="text-2xl font-bold">{activeServices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Combos</p>
                    <p className="text-2xl font-bold">
                      {mockServices.filter(s => s.category === "Combo").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar serviço..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="elevated" className={!service.active ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          {!service.active && (
                            <Badge variant="secondary">Inativo</Badge>
                          )}
                        </div>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {service.active ? "Desativar" : "Ativar"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-lg font-bold text-accent">
                          {service.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====== SEÇÃO DE ASSINATURAS ====== */}
        <section className="space-y-6">
          <div className="border-t pt-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-accent" />
                  Assinaturas e Pacotes
                </h2>
                <p className="text-muted-foreground">
                  Crie planos recorrentes e pacotes de créditos para seus clientes
                </p>
              </div>
              <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent">
                    <Plus className="w-4 h-4" />
                    Nova Assinatura
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Assinatura/Pacote</DialogTitle>
                    <DialogDescription>
                      Configure um novo plano para oferecer aos seus clientes
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="sub-name">Nome do plano</Label>
                      <Input id="sub-name" placeholder="Ex: Plano Mensal Premium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sub-description">Descrição</Label>
                      <Textarea 
                        id="sub-description" 
                        placeholder="Descreva os benefícios do plano..."
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sub-price">Preço (R$)</Label>
                        <Input id="sub-price" type="number" step="0.01" placeholder="150.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-cycle">Tipo de cobrança</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Mensal (recorrente)</SelectItem>
                            <SelectItem value="quarterly">Trimestral</SelectItem>
                            <SelectItem value="yearly">Anual</SelectItem>
                            <SelectItem value="once">Pagamento único (pacote)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="credits">Créditos/Usos</Label>
                        <Input id="credits" type="number" placeholder="4" />
                        <p className="text-xs text-muted-foreground">Deixe vazio para ilimitado</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="validity">Validade (dias)</Label>
                        <Input id="validity" type="number" placeholder="30" />
                        <p className="text-xs text-muted-foreground">Período para usar os créditos</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Serviços incluídos</Label>
                      <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                        {mockServices.filter(s => s.active).map(service => (
                          <div key={service.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={`service-${service.id}`}
                              checked={selectedServices.includes(service.name)}
                              onCheckedChange={() => toggleServiceSelection(service.name)}
                            />
                            <label 
                              htmlFor={`service-${service.id}`} 
                              className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                            >
                              <span>{service.name}</span>
                              <Badge variant="outline" className="text-xs">
                                R$ {service.price.toFixed(2).replace('.', ',')}
                              </Badge>
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedServices.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {selectedServices.length} serviço(s) selecionado(s)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sub-active">Plano ativo</Label>
                      <Switch id="sub-active" defaultChecked />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsSubscriptionDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" variant="accent">
                        Criar Plano
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Subscription Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Planos</p>
                      <p className="text-2xl font-bold">{mockSubscriptions.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assinantes Ativos</p>
                      <p className="text-2xl font-bold">{totalSubscribers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Repeat className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita Recorrente</p>
                      <p className="text-2xl font-bold">R$ 4.560</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSubscriptions.map((subscription, index) => (
                <motion.div
                  key={subscription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="elevated" className={!subscription.active ? "opacity-60" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{subscription.name}</h3>
                          </div>
                          <Badge variant={subscription.billingCycle === "once" ? "outline" : "default"}>
                            {subscription.billingCycle === "monthly" && "Mensal"}
                            {subscription.billingCycle === "quarterly" && "Trimestral"}
                            {subscription.billingCycle === "yearly" && "Anual"}
                            {subscription.billingCycle === "once" && "Pacote único"}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="w-4 h-4 mr-2" />
                              Ver assinantes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              {subscription.active ? "Desativar" : "Ativar"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {subscription.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {subscription.services.slice(0, 2).map(service => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {subscription.services.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{subscription.services.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {subscription.credits ? `${subscription.credits} créditos` : "Ilimitado"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{subscription.subscribers} assinantes</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          {subscription.billingCycle === "once" ? "Valor total" : "Por mês"}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-accent">
                            R$ {subscription.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
