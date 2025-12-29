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
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockClients = [
  { 
    id: 1, 
    name: "Carlos Mendes", 
    phone: "(11) 99999-1234", 
    email: "carlos@email.com",
    visits: 15,
    lastVisit: "2024-01-10",
    totalSpent: 1250.00,
    tags: ["VIP", "Fiel"],
    notes: "Prefere corte degradê"
  },
  { 
    id: 2, 
    name: "Ricardo Alves", 
    phone: "(11) 98888-5678", 
    email: "ricardo@email.com",
    visits: 8,
    lastVisit: "2024-01-08",
    totalSpent: 640.00,
    tags: ["Novo"],
    notes: ""
  },
  { 
    id: 3, 
    name: "Fernando Costa", 
    phone: "(11) 97777-9012", 
    email: "fernando@email.com",
    visits: 23,
    lastVisit: "2024-01-09",
    totalSpent: 1840.00,
    tags: ["VIP"],
    notes: "Agenda sempre às terças"
  },
  { 
    id: 4, 
    name: "Lucas Silva", 
    phone: "(11) 96666-3456", 
    email: "lucas@email.com",
    visits: 5,
    lastVisit: "2024-01-05",
    totalSpent: 400.00,
    tags: [],
    notes: ""
  },
  { 
    id: 5, 
    name: "André Oliveira", 
    phone: "(11) 95555-7890", 
    email: "andre@email.com",
    visits: 12,
    lastVisit: "2024-01-07",
    totalSpent: 960.00,
    tags: ["Fiel"],
    notes: "Alérgico a alguns produtos"
  }
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie sua base de clientes e histórico
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Cliente</DialogTitle>
                <DialogDescription>
                  Adicione um novo cliente à sua base
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail (opcional)</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Data de aniversário (opcional)</Label>
                  <Input id="birthday" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Preferências, alergias, etc..."
                    rows={3}
                  />
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
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Clientes</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clientes VIP</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Novos este mês</p>
                  <p className="text-2xl font-bold">18</p>
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
              placeholder="Buscar por nome, telefone ou e-mail..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Clients Table */}
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Visitas</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Total Gasto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Tags</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <motion.tr 
                      key={client.id}
                      className="border-b hover:bg-secondary/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="font-semibold text-accent text-sm">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            {client.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">{client.visits}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">
                          R$ {client.totalSpent.toFixed(2).replace('.', ',')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {client.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant={tag === "VIP" ? "default" : "secondary"}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Novo agendamento
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredClients.length} de {mockClients.length} clientes
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
