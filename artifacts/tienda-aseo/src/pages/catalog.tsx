import { useState } from "react";
import { useLocation } from "wouter";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Catalog() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const initialCategory = searchParams.get("category") ? Number(searchParams.get("category")) : undefined;
  const initialFeatured = searchParams.get("featured") === "true";
  
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(initialCategory);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialFeatured);

  const { data: categories } = useListCategories();
  const { data: products, isLoading } = useListProducts({ 
    search: search.length > 2 ? search : undefined, 
    categoryId, 
    featured: isFeatured ? true : undefined 
  });

  const clearFilters = () => {
    setSearch("");
    setCategoryId(undefined);
    setIsFeatured(false);
  };

  const hasFilters = search.length > 0 || categoryId !== undefined || isFeatured;

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Catálogo de Productos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Encuentra todo lo que necesitas para el cuidado personal y la limpieza de tu hogar.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 font-semibold mb-4 text-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Producto, marca..."
                      className="pl-9 bg-background"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Categoría</label>
                  <Select 
                    value={categoryId?.toString() || "all"} 
                    onValueChange={(val) => setCategoryId(val === "all" ? undefined : Number(val))}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-2">
                  <Button 
                    variant={isFeatured ? "default" : "outline"} 
                    className="w-full justify-start"
                    onClick={() => setIsFeatured(!isFeatured)}
                  >
                    Solo Destacados
                  </Button>
                </div>

                {hasFilters && (
                  <Button variant="ghost" className="w-full text-muted-foreground mt-2" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {/* Active filters display */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {categoryId !== undefined && categories && (
                  <Badge variant="secondary" className="rounded-sm px-2 py-1">
                    Categoría: {categories.find(c => c.id === categoryId)?.name}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setCategoryId(undefined)} />
                  </Badge>
                )}
                {isFeatured && (
                  <Badge variant="secondary" className="rounded-sm px-2 py-1">
                    Destacados
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setIsFeatured(false)} />
                  </Badge>
                )}
                {search && (
                  <Badge variant="secondary" className="rounded-sm px-2 py-1">
                    Búsqueda: {search}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearch("")} />
                  </Badge>
                )}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-border h-[380px] animate-pulse"></div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed shadow-sm">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-foreground mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Intenta ajustar los filtros o cambiar el término de búsqueda para encontrar lo que necesitas.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
