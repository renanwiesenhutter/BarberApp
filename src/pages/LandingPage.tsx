import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Scissors, 
  CreditCard, 
  BarChart3, 
  Store, 
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import heroBarbershop from "@/assets/hero-barbershop.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Calendar,
    title: "Agendamento Online",
    description: "Seus clientes agendam 24/7 pelo link exclusivo da sua barbearia"
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "CRM completo com histórico, preferências e fidelização"
  },
  {
    icon: Scissors,
    title: "Serviços e Combos",
    description: "Cadastre serviços, combos e variações com preços flexíveis"
  },
  {
    icon: CreditCard,
    title: "Fluxo de Caixa",
    description: "Controle financeiro completo com entradas, saídas e relatórios"
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Métricas de performance por profissional, serviço e período"
  },
  {
    icon: Store,
    title: "Loja de Produtos",
    description: "Venda produtos com controle de estoque integrado"
  }
];

const benefits = [
  "Site profissional gerado automaticamente",
  "Link exclusivo para agendamentos",
  "Gestão de assinaturas e pacotes",
  "Notificações automáticas por e-mail",
  "Múltiplos profissionais com agendas independentes",
  "Controle de comissões e repasses"
];

export default function LandingPage() {
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
              <span className="font-display font-bold text-xl">BarberPro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </a>
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button variant="accent" size="sm">Começar Grátis</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Link to="/register">
                <Button variant="accent" size="sm">Começar</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface" />
        <div className="section-container relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Sistema completo para barbearias modernas
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Gerencie sua barbearia com{" "}
              <span className="text-gradient">excelência profissional</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
            >
              Agendamento online, gestão financeira, controle de clientes e muito mais. 
              Tudo em um só lugar para você focar no que importa: seus clientes.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg">
                  Ver Demonstração
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-success" />
                Configuração em 5 minutos
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                Dados seguros
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-dramatic">
              <img 
                src={heroBarbershop} 
                alt="Interior de barbearia moderna" 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass rounded-xl p-6 max-w-md">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground">Próximo agendamento</p>
                      <p className="text-sm text-muted-foreground">João Silva • Corte + Barba</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                      Confirmado
                    </span>
                    <span className="text-sm text-muted-foreground">14:30 - Hoje</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="section-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para gerenciar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas profissionais pensadas para o dia a dia da sua barbearia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Sua barbearia merece um{" "}
                <span className="text-gradient">sistema profissional</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Esqueça planilhas e agendas de papel. Com o BarberPro, você tem 
                controle total do seu negócio na palma da mão.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={benefit}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/register">
                  <Button variant="accent" size="lg">
                    Criar minha conta grátis
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card variant="elevated" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-display font-semibold">Faturamento do Mês</p>
                      <p className="text-3xl font-bold text-foreground">R$ 12.450,00</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-success" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-sm text-muted-foreground">Agendamentos</p>
                      <p className="text-2xl font-bold">187</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-sm text-muted-foreground">Novos Clientes</p>
                      <p className="text-2xl font-bold">34</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Taxa de comparecimento</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full w-[94%] rounded-full bg-gradient-warm" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="section-container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para transformar sua barbearia?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de barbearias que já usam o BarberPro para 
              crescer e encantar seus clientes.
            </p>
            <Link to="/register">
              <Button variant="hero" size="xl" className="bg-card text-foreground hover:bg-card/90">
                Começar Agora — É Grátis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">BarberPro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 BarberPro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
