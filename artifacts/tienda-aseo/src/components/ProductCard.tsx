import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@workspace/api-client-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/productos/${product.id}`} className="group relative bg-card rounded-xl border border-border overflow-hidden hover-elevate transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted/30 relative">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            Sin imagen
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm border-none">
              Destacado
            </Badge>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <Badge variant="destructive" className="shadow-sm border-none">
              ¡Oferta!
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="uppercase tracking-wider font-medium text-primary/80">{product.categoryName || 'General'}</span>
          {product.brand && <span>{product.brand}</span>}
        </div>
        
        <h3 className="font-semibold text-lg leading-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        {product.unit && (
          <p className="text-sm text-muted-foreground mb-4">{product.unit}</p>
        )}
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <Button size="icon" className="rounded-full shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
