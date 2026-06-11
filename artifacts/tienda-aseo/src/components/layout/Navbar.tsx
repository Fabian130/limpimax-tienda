import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Menu, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                LM
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">LimpiMax</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
              <ShieldAlert className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full">
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>

          <button className="md:hidden p-2 text-muted-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`block py-2 text-sm font-medium ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border flex items-center gap-4">
             <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldAlert className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
