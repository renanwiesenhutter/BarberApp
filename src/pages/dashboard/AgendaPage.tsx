import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  User
} from "lucide-react";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

const professionals = [
  { id: 1, name: "João Silva", color: "bg-accent" },
  { id: 2, name: "Pedro Santos", color: "bg-info" },
  { id: 3, name: "Carlos Mendes", color: "bg-success" }
];

const appointments = [
  { id: 1, professionalId: 1, time: "09:00", duration: 60, client: "Ricardo Alves", service: "Corte + Barba", status: "confirmed" },
  { id: 2, professionalId: 2, time: "09:30", duration: 30, client: "Fernando Costa", service: "Corte Degradê", status: "confirmed" },
  { id: 3, professionalId: 1, time: "11:00", duration: 45, client: "Lucas Silva", service: "Corte + Sobrancelha", status: "pending" },
  { id: 4, professionalId: 3, time: "10:00", duration: 30, client: "André Oliveira", service: "Barba", status: "confirmed" },
  { id: 5, professionalId: 2, time: "14:00", duration: 60, client: "Bruno Martins", service: "Corte + Barba", status: "confirmed" },
  { id: 6, professionalId: 1, time: "15:30", duration: 30, client: "Marcos Lima", service: "Corte", status: "confirmed" }
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTimeSlotPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = 8;
    const slotHeight = 48;
    return ((hours - startHour) * 2 + (minutes / 30)) * slotHeight;
  };

  const getAppointmentHeight = (duration: number) => {
    const slotHeight = 48;
    return (duration / 30) * slotHeight;
  };

  const filteredAppointments = selectedProfessional
    ? appointments.filter(a => a.professionalId === selectedProfessional)
    : appointments;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Agenda</h1>
            <p className="text-muted-foreground">
              Gerencie os agendamentos da sua barbearia
            </p>
          </div>
          <Button variant="accent">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </Button>
        </div>

        {/* Calendar Navigation */}
        <Card variant="elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() - 7);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <CardTitle>
                  {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 7);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Hoje
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week Days */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDate(date)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    isToday(date)
                      ? "bg-accent text-accent-foreground"
                      : date.toDateString() === currentDate.toDateString()
                      ? "bg-secondary"
                      : "hover:bg-secondary"
                  }`}
                >
                  <p className="text-xs text-inherit opacity-70">{weekDays[index]}</p>
                  <p className="text-lg font-semibold">{date.getDate()}</p>
                </button>
              ))}
            </div>

            {/* Professional Filter */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant={selectedProfessional === null ? "accent" : "outline"}
                size="sm"
                onClick={() => setSelectedProfessional(null)}
              >
                Todos
              </Button>
              {professionals.map((professional) => (
                <Button
                  key={professional.id}
                  variant={selectedProfessional === professional.id ? "accent" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProfessional(professional.id)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${professional.color}`} />
                  {professional.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Grid */}
        <Card variant="elevated" className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              {/* Time Labels */}
              <div className="w-16 flex-shrink-0 border-r">
                <div className="h-12 border-b" /> {/* Header spacer */}
                {timeSlots.map((time) => (
                  <div 
                    key={time} 
                    className="h-12 flex items-start justify-end pr-2 pt-0 text-xs text-muted-foreground"
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Columns for each professional */}
              <div className="flex-1 grid grid-cols-3 divide-x">
                {professionals
                  .filter(p => selectedProfessional === null || p.id === selectedProfessional)
                  .map((professional) => (
                  <div key={professional.id} className="relative">
                    {/* Professional Header */}
                    <div className="h-12 border-b flex items-center justify-center gap-2 bg-secondary/50">
                      <div className={`w-3 h-3 rounded-full ${professional.color}`} />
                      <span className="text-sm font-medium">{professional.name}</span>
                    </div>

                    {/* Time Grid Lines */}
                    <div className="relative">
                      {timeSlots.map((time, index) => (
                        <div 
                          key={time} 
                          className={`h-12 border-b border-dashed ${
                            index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                          }`}
                        />
                      ))}

                      {/* Appointments */}
                      {filteredAppointments
                        .filter(a => a.professionalId === professional.id)
                        .map((appointment) => {
                          const top = getTimeSlotPosition(appointment.time);
                          const height = getAppointmentHeight(appointment.duration);
                          
                          return (
                            <motion.div
                              key={appointment.id}
                              className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer ${professional.color} ${
                                appointment.status === "pending" ? "opacity-70" : ""
                              }`}
                              style={{ top, height: height - 4 }}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="text-xs font-medium text-accent-foreground truncate">
                                {appointment.client}
                              </div>
                              <div className="text-xs text-accent-foreground/80 truncate">
                                {appointment.service}
                              </div>
                              {appointment.status === "pending" && (
                                <Badge variant="warning" className="mt-1 text-[10px] px-1 py-0">
                                  Pendente
                                </Badge>
                              )}
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
                <p className="text-xl font-bold">6</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <User className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
