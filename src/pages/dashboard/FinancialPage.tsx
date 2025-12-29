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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  DollarSign, 
  Plus, 
  Search, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  CreditCard,
  Wallet,
  PiggyBank,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockTransactions = [
  { 
    id: 1, 
    type: "income" as const,
    description: "Corte + Barba - Carlos Mendes", 
    amount: 75.00,
    category: "Serviços",
    paymentMethod: "PIX",
    date: "2024-01-10",
    professional: "João"
  },
  { 
    id: 2, 
    type: "income" as const,
    description: "Corte Degradê - Ricardo Alves", 
    amount: 55.00,
    category: "Serviços",
    paymentMethod: "Cartão Débito",
    date: "2024-01-10",
    professional: "Pedro"
  },
  { 
    id: 3, 
    type: "expense" as const,
    description: "Compra de produtos - Pomadas", 
    amount: 280.00,
    category: "Produtos",
    paymentMethod: "PIX",
    date: "2024-01-09",
    professional: null
  },
  { 
    id: 4, 
    type: "income" as const,
    description: "Pomada Modeladora - Venda", 
    amount: 45.00,
    category: "Produtos",
    paymentMethod: "Dinheiro",
    date: "2024-01-09",
    professional: "João"
  },
  { 
    id: 5, 
    type: "expense" as const,
    description: "Aluguel - Janeiro", 
    amount: 2500.00,
    category: "Aluguel",
    paymentMethod: "Transferência",
    date: "2024-01-05",
    professional: null
  },
  { 
    id: 6, 
    type: "income" as const,
    description: "Barba Completa - Fernando Costa", 
    amount: 35.00,
    category: "Serviços",
    paymentMethod: "PIX",
    date: "2024-01-08",
    professional: "João"
  }
];

const incomeCategories = ["Serviços", "Produtos", "Assinaturas", "Outros"];
const expenseCategories = ["Produtos", "Aluguel", "Salários", "Marketing", "Equipamentos", "Taxas", "Outros"];
const paymentMethods = ["Dinheiro", "PIX", "Cartão Crédito", "Cartão Débito", "Transferência"];

export default function FinancialPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const [dateFilter, setDateFilter] = useState("month");

  const totalIncome = mockTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = mockTransactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Financeiro</h1>
            <p className="text-muted-foreground">
              Controle seu fluxo de caixa e finanças
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                Novo Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Lançamento</DialogTitle>
                <DialogDescription>
                  Registre uma entrada ou saída no caixa
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as "income" | "expense")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="income" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Entrada
                    </TabsTrigger>
                    <TabsTrigger value="expense" className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive">
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Saída
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input id="description" placeholder="Ex: Corte + Barba - Cliente" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input id="amount" type="number" step="0.01" placeholder="75.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {(transactionType === "income" ? incomeCategories : expenseCategories).map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method.toLowerCase()}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Adicione observações..."
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="accent">
                    Salvar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entradas</p>
                  <p className="text-2xl font-bold text-success">
                    R$ {totalIncome.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saídas</p>
                  <p className="text-2xl font-bold text-destructive">
                    R$ {totalExpense.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saldo</p>
                  <p className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
                    R$ {balance.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Médio</p>
                  <p className="text-2xl font-bold">R$ 52,50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar lançamento..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>

        {/* Transactions Table */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Lançamentos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Descrição</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Pagamento</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Valor</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr 
                      key={transaction.id}
                      className="border-b hover:bg-secondary/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <span className="text-sm">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "income" 
                              ? "bg-success/10" 
                              : "bg-destructive/10"
                          }`}>
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="w-4 h-4 text-success" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            {transaction.professional && (
                              <p className="text-sm text-muted-foreground">
                                Por: {transaction.professional}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{transaction.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{transaction.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-semibold ${
                          transaction.type === "income" ? "text-success" : "text-destructive"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"} R$ {transaction.amount.toFixed(2).replace('.', ',')}
                        </span>
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
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
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
      </div>
    </DashboardLayout>
  );
}
