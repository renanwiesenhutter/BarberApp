import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  UserCircle, 
  Plus, 
  Search, 
  Phone, 
  Mail,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Star,
  Clock,
  Instagram,
  Camera
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProfessionals = [
  { 
    id: 1, 
    name: "João Silva", 
    role: "Barbeiro Sênior",
    phone: "(11) 99999-1111", 
    email: "joao@barbearia.com",
    photo: null,
    instagram: "@joao.barber",
    specialties: ["Degradê", "Barba Artística"],
    rating: 4.9,
    appointments: 156,
    commission: 50,
    active: true,
    schedule: {
      seg: { start: "09:00", end: "18:00" },
      ter: { start: "09:00", end: "18:00" },
      qua: { start: "09:00", end: "18:00" },
      qui: { start: "09:00", end: "18:00" },
      sex: { start: "09:00", end: "18:00" },
      sab: { start: "09:00", end: "14:00" },
      dom: null
    }
  },
  { 
    id: 2, 
    name: "Pedro Santos", 
    role: "Barbeiro",
    phone: "(11) 98888-2222", 
    email: "pedro@barbearia.com",
    photo: null,
    instagram: "@pedro.cuts",
    specialties: ["Corte Clássico", "Navalhado"],
    rating: 4.7,
    appointments: 89,
    commission: 45,
    active: true,
    schedule: {
      seg: { start: "10:00", end: "19:00" },
      ter: { start: "10:00", end: "19:00" },
      qua: { start: "10:00", end: "19:00" },
      qui: { start: "10:00", end: "19:00" },
      sex: { start: "10:00", end: "19:00" },
      sab: { start: "10:00", end: "15:00" },
      dom: null
    }
  },
  { 
    id: 3, 
    name: "Lucas Oliveira", 
    role: "Barbeiro Junior",
    phone: "(11) 97777-3333", 
    email: "lucas@barbearia.com",
    photo: null,
    instagram: "@lucas.barber",
    specialties: ["Corte Infantil"],
    rating: 4.5,
    appointments: 42,
    commission: 40,
    active: true,
    schedule: {
      seg: { start: "09:00", end: "18:00" },
      ter: { start: "09:00", end: "18:00" },
      qua: null,
      qui: { start: "09:00", end: "18:00" },
      sex: { start: "09:00", end: "18:00" },
      sab: { start: "09:00", end: "14:00" },
      dom: null
    }
  }
];

const weekDays = [
  { key: "seg", label: "Seg" },
  { key: "ter", label: "Ter" },
  { key: "qua", label: "Qua" },
  { key: "qui", label: "Qui" },
  { key: "sex", label: "Sex" },
  { key: "sab", label: "Sáb" },
  { key: "dom", label: "Dom" }
];

export default function ProfessionalsPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProfessionals = mockProfessionals.filter(pro =>
    pro.name.toLowerCase().includes(search.toLowerCase()) ||
    pro.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Profissionais</h1>
            <p className="text-muted-foreground">
              Gerencie sua equipe de barbeiros
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastrar Profissional</DialogTitle>
                <DialogDescription>
                  Adicione um novo membro à sua equipe
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                {/* Photo Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Button 
                      type="button" 
                      variant="accent" 
                      size="icon-sm" 
                      className="absolute bottom-0 right-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Nome do profissional" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input id="role" placeholder="Ex: Barbeiro Sênior" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="@usuario" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">Comissão (%)</Label>
                    <Input id="commission" type="number" placeholder="50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialties">Especialidades</Label>
                  <Input id="specialties" placeholder="Degradê, Barba, etc (separar por vírgula)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Conte um pouco sobre o profissional..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Horário de Trabalho</Label>
                  <div className="grid gap-2">
                    {weekDays.map(day => (
                      <div key={day.key} className="flex items-center gap-4">
                        <span className="w-10 text-sm font-medium">{day.label}</span>
                        <Input 
                          type="time" 
                          placeholder="09:00" 
                          className="w-28"
                        />
                        <span className="text-muted-foreground">até</span>
                        <Input 
                          type="time" 
                          placeholder="18:00" 
                          className="w-28"
                        />
                        <Switch defaultChecked={day.key !== "dom"} />
                      </div>
                    ))}
                  </div>
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar profissional..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((pro, index) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="h-24 bg-gradient-warm" />
                <CardContent className="pt-0 px-6 pb-6">
                  <div className="flex justify-between -mt-12">
                    <div className="w-24 h-24 rounded-full bg-card border-4 border-card flex items-center justify-center shadow-lg">
                      {pro.photo ? (
                        <img src={pro.photo} alt={pro.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-accent">
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="mt-14">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Ver agenda
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Desativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">{pro.name}</h3>
                    <p className="text-sm text-muted-foreground">{pro.role}</p>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-semibold">{pro.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{pro.appointments} atendimentos</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {pro.specialties.map(spec => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {pro.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Instagram className="w-4 h-4" />
                      {pro.instagram}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      Horários
                    </div>
                    <div className="flex gap-1">
                      {weekDays.map(day => (
                        <div 
                          key={day.key}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            pro.schedule[day.key as keyof typeof pro.schedule]
                              ? "bg-accent/10 text-accent"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {day.label[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
