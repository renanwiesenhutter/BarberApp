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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Package, 
  Plus, 
  Search, 
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  Box,
  Camera
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProducts = [
  { 
    id: 1, 
    name: "Pomada Modeladora Matte", 
    category: "Pomadas",
    price: 45.00,
    costPrice: 25.00,
    stock: 15,
    minStock: 5,
    sku: "POM-001",
    description: "Pomada de fixação média com acabamento matte",
    active: true
  },
  { 
    id: 2, 
    name: "Óleo para Barba Premium", 
    category: "Barba",
    price: 65.00,
    costPrice: 35.00,
    stock: 8,
    minStock: 3,
    sku: "OLE-001",
    description: "Óleo hidratante para barba com fragrância amadeirada",
    active: true
  },
  { 
    id: 3, 
    name: "Shampoo Antiqueda", 
    category: "Cabelo",
    price: 55.00,
    costPrice: 28.00,
    stock: 3,
    minStock: 5,
    sku: "SHA-001",
    description: "Shampoo especial para combater queda de cabelo",
    active: true
  },
  { 
    id: 4, 
    name: "Cera Capilar Extra Forte", 
    category: "Pomadas",
    price: 38.00,
    costPrice: 18.00,
    stock: 22,
    minStock: 5,
    sku: "CER-001",
    description: "Cera de fixação extra forte com brilho",
    active: true
  },
  { 
    id: 5, 
    name: "Kit Barba Completo", 
    category: "Kits",
    price: 150.00,
    costPrice: 85.00,
    stock: 5,
    minStock: 2,
    sku: "KIT-001",
    description: "Kit com óleo, balm e pente para barba",
    active: true
  },
  { 
    id: 6, 
    name: "Spray Fixador", 
    category: "Cabelo",
    price: 32.00,
    costPrice: 15.00,
    stock: 0,
    minStock: 5,
    sku: "SPR-001",
    description: "Spray fixador de longa duração",
    active: false
  }
];

const categories = ["Pomadas", "Barba", "Cabelo", "Kits", "Acessórios"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = mockProducts.length;
  const lowStockProducts = mockProducts.filter(p => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStock = mockProducts.filter(p => p.stock === 0).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Produtos</h1>
            <p className="text-muted-foreground">
              Gerencie seu catálogo e estoque de produtos
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Produto</DialogTitle>
                <DialogDescription>
                  Adicione um novo produto ao catálogo
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                {/* Photo Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center">
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

                <div className="space-y-2">
                  <Label htmlFor="name">Nome do produto</Label>
                  <Input id="name" placeholder="Ex: Pomada Modeladora" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="POM-001" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Preço de Custo (R$)</Label>
                    <Input id="costPrice" type="number" step="0.01" placeholder="25.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço de Venda (R$)</Label>
                    <Input id="price" type="number" step="0.01" placeholder="45.00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Estoque Inicial</Label>
                    <Input id="stock" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Estoque Mínimo</Label>
                    <Input id="minStock" type="number" placeholder="5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva o produto..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Produtos</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                  <p className="text-2xl font-bold">{lowStockProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Box className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sem Estoque</p>
                  <p className="text-2xl font-bold">{outOfStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                  <p className="text-2xl font-bold">R$ {totalValue.toFixed(0)}</p>
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
              placeholder="Buscar por nome ou SKU..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="elevated" className={!product.active ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
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
                        <DropdownMenuItem>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Registrar venda
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          {product.active ? "Desativar" : "Ativar"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>

                  <Badge variant="outline" className="mb-3">{product.category}</Badge>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Estoque</p>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${
                          product.stock === 0 
                            ? "text-destructive" 
                            : product.stock <= product.minStock 
                              ? "text-warning" 
                              : "text-foreground"
                        }`}>
                          {product.stock} un
                        </span>
                        {product.stock <= product.minStock && product.stock > 0 && (
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        )}
                        {product.stock === 0 && (
                          <Badge variant="destructive" className="text-xs">Esgotado</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Preço</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-lg font-bold text-accent">
                          {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
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
