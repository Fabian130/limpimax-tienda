import { useGetFeaturedProducts, useListCategories } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const { data: featuredProducts, isLoading: loadingFeatured } = useGetFeaturedProducts();
  const { data: categories, isLoading: loadingCategories } = useListCategories();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="LimpiMax Store" 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-primary-foreground">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-wider text-secondary-foreground mb-6">
              NUEVA COLECCIÓN
            </span>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
              Limpieza <span className="text-secondary">poderosa</span>, frescura que perdura.
            </h1>
            <p className="mb-8 text-lg md:text-xl text-primary-foreground/90 max-w-xl">
              Descubre nuestra línea de productos de aseo diseñados para dejar tu hogar impecable y cuidar de ti y tu familia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="rounded-full font-bold px-8 shadow-lg">
                <Link href="/catalogo">Comprar ahora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/catalogo?featured=true">Ver ofertas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Máxima Eficacia</h3>
              <p className="text-muted-foreground text-sm">Fórmulas concentradas para remover la suciedad más difícil sin esfuerzo.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Seguro para Ti</h3>
              <p className="text-muted-foreground text-sm">Dermatológicamente probados para cuidar tu piel mientras limpias.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="h-12 w-12 rounded-full bg-secondary/20 text-yellow-600 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Eco-Amigable</h3>
              <p className="text-muted-foreground text-sm">Empaques reciclables y componentes biodegradables para un futuro mejor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Productos Destacados</h2>
              <p className="text-muted-foreground">Los favoritos de nuestros clientes</p>
            </div>
            <Link href="/catalogo" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border h-[380px] animate-pulse"></div>
              ))}
            </div>
          ) : featuredProducts?.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-xl border border-border border-dashed">
              <p className="text-muted-foreground">No hay productos destacados por el momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
             <Button variant="outline" asChild className="w-full">
                <Link href="/catalogo">Ver todos los productos</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Explora por Categoría</h2>
            <p className="text-muted-foreground">Encuentra exactamente lo que necesitas para cada espacio de tu hogar.</p>
          </div>

          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border h-48 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories?.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/catalogo?category=${category.id}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card aspect-square hover-elevate transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                  {category.imageUrl ? (
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/20">{category.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors">{category.name}</h3>
                    <p className="text-white/80 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explorar productos &rarr;
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
