import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Scissors, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  ChevronRight,
  ChevronLeft,
  User,
  Check
} from "lucide-react";

// Mock data for a barbershop
const barbershop = {
  name: "Barbearia Premium",
  slug: "barbearia-premium",
  description: "A melhor experiência em cortes masculinos da cidade",
  address: "Rua das Flores, 123 - Centro",
  phone: "(11) 99999-9999",
  rating: 4.9,
  reviews: 127,
  logo: null,
  coverImage: null
};

const services = [
  { id: 1, name: "Corte Tradicional", duration: 30, price: 45, description: "Corte clássico com tesoura e máquina" },
  { id: 2, name: "Corte Degradê", duration: 45, price: 55, description: "Corte moderno com degradê perfeito" },
  { id: 3, name: "Barba", duration: 30, price: 35, description: "Barba completa com toalha quente" },
  { id: 4, name: "Corte + Barba", duration: 60, price: 75, description: "Combo completo corte e barba" },
  { id: 5, name: "Corte + Sobrancelha", duration: 45, price: 55, description: "Corte com design de sobrancelha" },
  { id: 6, name: "Pigmentação", duration: 60, price: 120, description: "Pigmentação profissional" }
];

const professionals = [
  { id: 1, name: "João Silva", specialty: "Degradê e Barba", avatar: null, rating: 4.9 },
  { id: 2, name: "Pedro Santos", specialty: "Cortes Modernos", avatar: null, rating: 4.8 },
  { id: 3, name: "Carlos Mendes", specialty: "Tradicional", avatar: null, rating: 4.7 }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

export default function PublicBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "" });

  const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedProfessionalData = professionals.find(p => p.id === selectedProfessional);

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="section-container">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-warm flex items-center justify-center">
              <Scissors className="w-8 h-8 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{barbershop.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  {barbershop.rating} ({barbershop.reviews} avaliações)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {barbershop.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="section-container py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Serviço" },
              { num: 2, label: "Profissional" },
              { num: 3, label: "Data e Hora" },
              { num: 4, label: "Confirmar" }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s.num 
                      ? "bg-gradient-warm text-accent-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{s.label}</span>
                </div>
                {index < 3 && (
                  <div className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-colors ${
                    step > s.num ? "bg-accent" : "bg-secondary"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">
                Escolha o serviço
              </h2>
              <div className="grid gap-3">
                {services.map((service) => (
                  <Card 
                    key={service.id}
                    variant={selectedService === service.id ? "elevated" : "default"}
                    className={`cursor-pointer transition-all ${
                      selectedService === service.id 
                        ? "ring-2 ring-accent" 
                        : "hover:shadow-elevated"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedService === service.id 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-secondary"
                        }`}>
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">R$ {service.price}</p>
                        {selectedService === service.id && (
                          <Badge variant="success" className="mt-1">Selecionado</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="accent" 
                  size="lg"
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                >
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Professional */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">
                Escolha o profissional
              </h2>
              <div className="grid gap-3">
                <Card 
                  variant={selectedProfessional === null ? "elevated" : "default"}
                  className={`cursor-pointer transition-all ${
                    selectedProfessional === null 
                      ? "ring-2 ring-accent" 
                      : "hover:shadow-elevated"
                  }`}
                  onClick={() => setSelectedProfessional(null)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedProfessional === null 
                        ? "bg-accent text-accent-foreground" 
                        : "bg-secondary"
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Qualquer profissional</h3>
                      <p className="text-sm text-muted-foreground">
                        Escolheremos o melhor horário disponível
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {professionals.map((professional) => (
                  <Card 
                    key={professional.id}
                    variant={selectedProfessional === professional.id ? "elevated" : "default"}
                    className={`cursor-pointer transition-all ${
                      selectedProfessional === professional.id 
                        ? "ring-2 ring-accent" 
                        : "hover:shadow-elevated"
                    }`}
                    onClick={() => setSelectedProfessional(professional.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedProfessional === professional.id 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-secondary"
                        }`}>
                          <span className="font-semibold">
                            {professional.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{professional.name}</h3>
                          <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-medium">{professional.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button variant="accent" size="lg" onClick={() => setStep(3)}>
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Select Date and Time */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">
                Escolha a data e horário
              </h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Data</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getNext7Days().map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 w-16 p-3 rounded-lg text-center transition-colors ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "bg-accent text-accent-foreground"
                          : "bg-card border hover:bg-secondary"
                      }`}
                    >
                      <p className="text-xs opacity-70">{weekDays[date.getDay()]}</p>
                      <p className="text-lg font-semibold">{date.getDate()}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Horário</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? "bg-accent text-accent-foreground"
                            : "bg-card border hover:bg-secondary"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button 
                  variant="accent" 
                  size="lg"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                >
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">
                Confirmar agendamento
              </h2>

              {/* Summary */}
              <Card variant="elevated" className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do agendamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serviço</span>
                    <span className="font-medium">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profissional</span>
                    <span className="font-medium">
                      {selectedProfessionalData?.name || "Qualquer profissional"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horário</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-medium">{selectedServiceData?.duration} minutos</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">R$ {selectedServiceData?.price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Client Info */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Seus dados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome completo</label>
                    <Input
                      placeholder="Seu nome"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">WhatsApp</label>
                    <Input
                      placeholder="(00) 00000-0000"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button 
                  variant="hero" 
                  size="lg"
                  disabled={!clientInfo.name || !clientInfo.phone}
                >
                  Confirmar Agendamento
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-6 mt-auto">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{barbershop.phone}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by BarberPro
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
