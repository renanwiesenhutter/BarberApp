import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  BarChart3, 
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Scissors,
  Package,
  UserCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const monthlyData = [
  { month: "Jan", income: 8500, expenses: 3200, appointments: 145 },
  { month: "Fev", income: 9200, expenses: 3400, appointments: 158 },
  { month: "Mar", income: 8800, expenses: 3100, appointments: 152 },
  { month: "Abr", income: 10500, expenses: 3600, appointments: 178 },
  { month: "Mai", income: 11200, expenses: 3800, appointments: 192 },
  { month: "Jun", income: 10800, expenses: 3500, appointments: 185 }
];

const topServices = [
  { name: "Corte + Barba", count: 89, revenue: 6675, percentage: 35 },
  { name: "Corte Degradê", count: 67, revenue: 3685, percentage: 26 },
  { name: "Corte Tradicional", count: 54, revenue: 2430, percentage: 21 },
  { name: "Barba Completa", count: 38, revenue: 1330, percentage: 15 },
  { name: "Sobrancelha", count: 12, revenue: 180, percentage: 5 }
];

const topProfessionals = [
  { name: "João Silva", appointments: 89, revenue: 5340, rating: 4.9 },
  { name: "Pedro Santos", appointments: 67, revenue: 3685, rating: 4.7 },
  { name: "Lucas Oliveira", appointments: 42, revenue: 2100, rating: 4.5 }
];

const topClients = [
  { name: "Carlos Mendes", visits: 15, spent: 1250 },
  { name: "Fernando Costa", visits: 23, spent: 1840 },
  { name: "Ricardo Alves", visits: 8, spent: 640 },
  { name: "André Oliveira", visits: 12, spent: 960 },
  { name: "Lucas Silva", visits: 5, spent: 400 }
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("month");

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1);
  const appointmentsChange = ((currentMonth.appointments - previousMonth.appointments) / previousMonth.appointments * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Analise o desempenho do seu negócio
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Faturamento</p>
                    <p className="text-2xl font-bold">R$ {currentMonth.income.toLocaleString('pt-BR')}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Number(incomeChange) >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${
                        Number(incomeChange) >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {incomeChange}%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Agendamentos</p>
                    <p className="text-2xl font-bold">{currentMonth.appointments}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Number(appointmentsChange) >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${
                        Number(appointmentsChange) >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {appointmentsChange}%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Médio</p>
                    <p className="text-2xl font-bold">
                      R$ {(currentMonth.income / currentMonth.appointments).toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">+5.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                    <p className="text-2xl font-bold">
                      R$ {(currentMonth.income - currentMonth.expenses).toLocaleString('pt-BR')}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">+12.3%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Faturamento Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <span className="text-muted-foreground">
                          R$ {data.income.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-warm rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.income / 12000) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-accent" />
                  Serviços Mais Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topServices.map((service, index) => (
                    <div key={service.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {service.count} vendas
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${service.percentage}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          />
                        </div>
                      </div>
                      <span className="font-semibold text-sm">
                        R$ {service.revenue.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rankings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Professionals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-accent" />
                  Desempenho por Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProfessionals.map((pro, index) => (
                    <div 
                      key={pro.name}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent">
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{pro.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{pro.appointments} atendimentos</span>
                          <span>★ {pro.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {pro.revenue.toLocaleString('pt-BR')}</p>
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Clientes Mais Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClients.map((client, index) => (
                    <div 
                      key={client.name}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.visits} visitas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {client.spent.toLocaleString('pt-BR')}</p>
                        {client.visits >= 10 && (
                          <Badge variant="default">VIP</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
