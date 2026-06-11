import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                LM
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">LimpiMax</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Tu marca colombiana de confianza para productos de aseo y cuidado personal. Calidad y frescura todos los días.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Tienda</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalogo" className="hover:text-primary transition-colors">Ver Catálogo</Link></li>
              <li><Link href="/catalogo?featured=true" className="hover:text-primary transition-colors">Ofertas Especiales</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Nuevos Productos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Categorías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalogo?category=1" className="hover:text-primary transition-colors">Cuidado Personal</Link></li>
              <li><Link href="/catalogo?category=2" className="hover:text-primary transition-colors">Limpieza del Hogar</Link></li>
              <li><Link href="/catalogo?category=3" className="hover:text-primary transition-colors">Lavandería</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Bogotá, Colombia</li>
              <li>contacto@limpimax.com.co</li>
              <li>+57 300 123 4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LimpiMax. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/terminos" className="hover:text-foreground">Términos</Link>
            <Link href="/privacidad" className="hover:text-foreground">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
