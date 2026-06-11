import { useParams, Link } from "wouter";
import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, Check, ShoppingCart, Info, Package, Tag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: {
      enabled: !!productId,
      queryKey: getGetProductQueryKey(productId)
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-card animate-pulse rounded-2xl aspect-square"></div>
          <div className="space-y-6">
            <div className="h-8 bg-muted animate-pulse rounded-md w-3/4"></div>
            <div className="h-6 bg-muted animate-pulse rounded-md w-1/4"></div>
            <div className="h-20 bg-muted animate-pulse rounded-md w-full"></div>
            <div className="h-12 bg-muted animate-pulse rounded-md w-full max-w-xs"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Producto no encontrado</h2>
        <p className="text-muted-foreground mb-8">El producto que buscas no existe o fue removido.</p>
        <Button asChild>
          <Link href="/catalogo">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-muted/30 border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/catalogo" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-2xl border border-border overflow-hidden relative flex items-center justify-center">
              {product.featured && (
                <Badge className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground shadow-sm">
                  Destacado
                </Badge>
              )}
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground flex flex-col items-center">
                  <Package className="h-16 w-16 mb-4 opacity-20" />
                  <p>Imagen no disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-sm">
              <span className="font-semibold text-primary uppercase tracking-wider">{product.categoryName}</span>
              {product.brand && (
                <>
                  <span className="text-muted-foreground">&bull;</span>
                  <span className="text-muted-foreground font-medium">{product.brand}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-black text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <div className="flex flex-col pb-1">
                  <span className="text-sm font-medium text-destructive">
                    Ahorras {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through decoration-destructive/50 font-medium">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                </div>
              )}
            </div>

            {product.description && (
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mb-8">
              {product.unit && (
                <Badge variant="outline" className="bg-background px-3 py-1 text-sm border-border">
                  <Tag className="mr-2 h-3 w-3 text-muted-foreground" />
                  Contenido: {product.unit}
                </Badge>
              )}
              <Badge variant="outline" className="bg-background px-3 py-1 text-sm border-border">
                {product.stock && product.stock > 0 ? (
                  <>
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    En stock ({product.stock})
                  </>
                ) : (
                  <>
                    <X className="mr-2 h-3 w-3 text-destructive" />
                    Agotado
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-4 mb-10">
              <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg font-bold rounded-xl shadow-lg" disabled={!product.stock || product.stock <= 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
              <p className="text-sm text-muted-foreground flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                Compra segura garantizada. Envío a todo el país.
              </p>
            </div>

            <Separator className="mb-8" />

            {/* Long description */}
            <div>
              <h3 className="text-xl font-bold flex items-center mb-4 text-foreground">
                <Info className="mr-2 h-5 w-5 text-primary" />
                Detalles del producto
              </h3>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                {product.longDescription ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{product.longDescription}</p>
                ) : (
                  <p className="italic">No hay detalles adicionales para este producto.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
