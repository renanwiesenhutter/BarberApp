import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  ExternalLink,
  Copy,
  Eye,
  Palette,
  Globe,
  Smartphone,
  Monitor,
  Settings,
  Share2
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function MySitePage() {
  const slug = "barbearia-premium";
  const siteUrl = `${window.location.origin}/site/${slug}`;
  const bookingUrl = `${window.location.origin}/b/${slug}`;

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Meu Site</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie o site da sua barbearia
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard/configuracoes">
                <Settings className="w-4 h-4" />
                Configurar
              </Link>
            </Button>
            <Button variant="accent" asChild>
              <a href={siteUrl} target="_blank">
                <ExternalLink className="w-4 h-4" />
                Abrir Site
              </a>
            </Button>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Site Preview */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    Preview do Site
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-secondary aspect-video">
                  <iframe 
                    src={siteUrl}
                    className="w-full h-full border-0"
                    title="Site Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">Links Rápidos</CardTitle>
                <CardDescription>
                  Compartilhe com seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Site Link */}
                <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Site</span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => copyLink(siteUrl)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <a href={siteUrl} target="_blank">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {siteUrl}
                  </p>
                </div>

                {/* Booking Link */}
                <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Agendamento</span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => copyLink(bookingUrl)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <a href={bookingUrl} target="_blank">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {bookingUrl}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={siteUrl} target="_blank">
                    <Eye className="w-4 h-4" />
                    Ver Site Completo
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={bookingUrl} target="_blank">
                    <Eye className="w-4 h-4" />
                    Ver Página de Agendamento
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/configuracoes">
                    <Palette className="w-4 h-4" />
                    Personalizar Aparência
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Barbearia Premium',
                        url: siteUrl
                      });
                    } else {
                      copyLink(siteUrl);
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Estatísticas do Site</CardTitle>
              <CardDescription>
                Acompanhe o desempenho do seu site (em breve)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Visitas</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Agendamentos</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Taxa Conversão</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Cliques</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
