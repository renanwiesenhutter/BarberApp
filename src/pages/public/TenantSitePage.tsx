import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock,
  Star,
  Instagram,
  Facebook,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - this would come from the tenant's configuration
const barbershop = {
  name: "Barbearia Premium",
  slug: "barbearia-premium",
  tagline: "A melhor experiência em cortes masculinos",
  description: "Tradição e modernidade se encontram para oferecer o melhor serviço de barbearia da região. Nossa equipe de profissionais experientes está pronta para transformar seu visual.",
  address: "Rua das Flores, 123 - Centro, São Paulo - SP",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  email: "contato@barbeariapremium.com",
  rating: 4.9,
  reviews: 127,
  hours: [
    { day: "Segunda a Sexta", time: "09:00 - 20:00" },
    { day: "Sábado", time: "09:00 - 18:00" },
    { day: "Domingo", time: "Fechado" }
  ],
  social: {
    instagram: "barbeariapremium",
    facebook: "barbeariapremium"
  }
};

const services = [
  { name: "Corte Tradicional", price: 45, duration: "30 min" },
  { name: "Corte Degradê", price: 55, duration: "45 min" },
  { name: "Barba Completa", price: 35, duration: "30 min" },
  { name: "Corte + Barba", price: 75, duration: "1h" },
  { name: "Pigmentação", price: 120, duration: "1h" }
];

const team = [
  { name: "João Silva", role: "Master Barber", specialty: "Degradê e Barba" },
  { name: "Pedro Santos", role: "Barber", specialty: "Cortes Modernos" },
  { name: "Carlos Mendes", role: "Barber", specialty: "Tradicional" }
];

export default function TenantSitePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">{barbershop.name}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm hover:text-accent transition-colors">Serviços</a>
              <a href="#team" className="text-sm hover:text-accent transition-colors">Equipe</a>
              <a href="#contact" className="text-sm hover:text-accent transition-colors">Contato</a>
            </div>
            <Link to={`/b/${barbershop.slug}`}>
              <Button variant="accent">
                <Calendar className="w-4 h-4" />
                Agendar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-dark text-primary-foreground">
        <div className="section-container">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {barbershop.tagline}
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl">
              {barbershop.description}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-semibold">{barbershop.rating}</span>
                <span className="text-primary-foreground/70">({barbershop.reviews} avaliações)</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>{barbershop.address}</span>
              </div>
            </div>
            <Link to={`/b/${barbershop.slug}`}>
              <Button variant="hero" size="xl">
                Agendar Agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="section-container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma variedade de serviços para atender todas as suas necessidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Scissors className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-2xl font-bold">R$ {service.price}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{service.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to={`/b/${barbershop.slug}`}>
              <Button variant="accent" size="lg">
                Ver todos os serviços e agendar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-secondary/30">
        <div className="section-container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profissionais experientes e apaixonados pelo que fazem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-warm mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-accent-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                    <p className="text-accent text-sm font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-sm mt-2">{member.specialty}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Contact Section */}
      <section id="contact" className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">Horário de Funcionamento</h2>
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {barbershop.hours.map((schedule) => (
                      <div key={schedule.day} className="flex items-center justify-between">
                        <span className="font-medium">{schedule.day}</span>
                        <span className={schedule.time === "Fechado" ? "text-muted-foreground" : "text-accent font-semibold"}>
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">Contato</h2>
              <Card variant="elevated">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">{barbershop.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone / WhatsApp</p>
                      <p className="font-medium">{barbershop.phone}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Redes Sociais</p>
                    <div className="flex gap-3">
                      <a 
                        href={`https://instagram.com/${barbershop.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a 
                        href={`https://facebook.com/${barbershop.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Pronto para transformar seu visual?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Agende agora mesmo e garanta seu horário
          </p>
          <Link to={`/b/${barbershop.slug}`}>
            <Button variant="hero" size="xl" className="bg-card text-foreground hover:bg-card/90">
              Agendar Horário
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold">{barbershop.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 {barbershop.name}. Powered by BarberPro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
