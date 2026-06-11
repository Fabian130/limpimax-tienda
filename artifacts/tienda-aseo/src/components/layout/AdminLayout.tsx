import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  LogOut,
  Store
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Productos", href: "/admin/productos" },
    { icon: Tags, label: "Categorías", href: "/admin/categorias" },
  ];

  return (
    <div className="min-h-[100dvh] flex bg-sidebar">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-2 text-sidebar-foreground">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground h-8 w-8 rounded flex items-center justify-center font-bold">
              LM
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium
                  ${isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors">
            <Store className="h-4 w-4" />
            Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:hidden">
           <Link href="/admin" className="font-bold text-lg text-foreground">Admin Panel</Link>
           <Link href="/" className="text-sm font-medium text-muted-foreground">Volver</Link>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
