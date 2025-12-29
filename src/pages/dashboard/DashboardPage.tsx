import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ChevronRight
} from "lucide-react";

const stats = [
  {
    title: "Agendamentos Hoje",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    icon: Calendar
  },
  {
    title: "Clientes Ativos",
    value: "248",
    change: "+12",
    changeType: "positive" as const,
    icon: Users
  },
  {
    title: "Faturamento Mensal",
    value: "R$ 8.450",
    change: "+18%",
    changeType: "positive" as const,
    icon: DollarSign
  },
  {
    title: "Ticket Médio",
    value: "R$ 67,60",
    change: "-2%",
    changeType: "negative" as const,
    icon: TrendingUp
  }
];

const upcomingAppointments = [
  { 
    id: 1,
    client: "Carlos Mendes", 
    service: "Corte + Barba", 
    time: "09:00", 
    professional: "João",
    status: "confirmed"
  },
  { 
    id: 2,
    client: "Ricardo Alves", 
    service: "Corte Degradê", 
    time: "09:45", 
    professional: "Pedro",
    status: "confirmed"
  },
  { 
    id: 3,
    client: "Fernando Costa", 
    service: "Barba", 
    time: "10:30", 
    professional: "João",
    status: "pending"
  },
  { 
    id: 4,
    client: "Lucas Silva", 
    service: "Corte Tradicional", 
    time: "11:00", 
    professional: "Pedro",
    status: "confirmed"
  },
  { 
    id: 5,
    client: "André Oliveira", 
    service: "Corte + Sobrancelha", 
    time: "11:45", 
    professional: "João",
    status: "confirmed"
  }
];

const recentActivity = [
  { type: "appointment", message: "Novo agendamento de Carlos Mendes", time: "5 min atrás" },
  { type: "payment", message: "Pagamento recebido - R$ 85,00", time: "15 min atrás" },
  { type: "client", message: "Novo cliente cadastrado: Ricardo Alves", time: "1h atrás" },
  { type: "appointment", message: "Agendamento cancelado por Pedro Santos", time: "2h atrás" }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está o resumo do seu dia.
            </p>
          </div>
          <Button variant="accent">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-success" : "text-destructive"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Próximos Agendamentos
                </CardTitle>
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="font-semibold text-accent">
                            {appointment.client.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{appointment.client}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">{appointment.professional}</p>
                        </div>
                        <Badge variant={appointment.status === "confirmed" ? "success" : "warning"}>
                          {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="elevated" className="h-full">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Novo Agendamento", icon: Calendar },
                  { label: "Cadastrar Cliente", icon: Users },
                  { label: "Lançar Venda", icon: DollarSign },
                  { label: "Ver Relatórios", icon: TrendingUp }
                ].map((action) => (
                  <Button 
                    key={action.label} 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
