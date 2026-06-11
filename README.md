# LimpiMax — Tienda de Productos de Aseo

Una tienda online moderna para promocionar y gestionar productos de aseo del hogar y cuidado personal. Incluye catálogo público con búsqueda y filtros, y un panel de administración completo para gestionar productos y categorías.

## Características

- **Catálogo público** con búsqueda por nombre y filtrado por categoría
- **Página de detalle** de producto con descripción completa, precio, marca y unidad
- **Panel de administración** (`/admin`) sin contraseña para:
  - Dashboard con estadísticas de la tienda
  - CRUD completo de productos (crear, editar, eliminar)
  - CRUD completo de categorías
- **Base de datos PostgreSQL** — todo lo que se sube desde el admin se persiste
- **API REST** documentada con OpenAPI

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite + TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |
| Routing | Wouter |
| Data fetching | TanStack Query (generado con Orval) |
| Backend | Express 5 + Node.js 24 |
| Base de datos | PostgreSQL + Drizzle ORM |
| Validación | Zod |
| Monorepo | pnpm workspaces |

## Requisitos previos

- Node.js 20 o superior
- pnpm 8 o superior (`npm install -g pnpm`)
- PostgreSQL (o usa Replit que lo provee automáticamente)

## Instalación y uso local

```bash
# 1. Clona el repositorio
git clone https://github.com/Fabian130/limpimax-tienda.git
cd limpimax-tienda

# 2. Instala las dependencias
pnpm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env y añade tu DATABASE_URL
```

### Variables de entorno requeridas

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/limpimax
SESSION_SECRET=una-clave-secreta-aleatoria
```

### Correr en desarrollo

```bash
# Terminal 1 — API server (puerto 5000 por defecto)
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend (puerto asignado automáticamente)
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/tienda-aseo run dev
```

### Migrar la base de datos

```bash
# Empuja el esquema a tu base de datos PostgreSQL
pnpm --filter @workspace/db run push
```

### Construir para producción

```bash
pnpm run build
```

## Estructura del proyecto

```
/
├── artifacts/
│   ├── api-server/          # Backend Express 5
│   │   └── src/routes/      # Rutas: categories, products, stats
│   └── tienda-aseo/         # Frontend React + Vite
│       └── src/pages/       # Páginas: Home, Catalog, Product, Admin
├── lib/
│   ├── api-spec/            # OpenAPI spec (fuente de verdad)
│   ├── api-client-react/    # Hooks generados (React Query)
│   ├── api-zod/             # Schemas Zod generados
│   └── db/                  # Schema Drizzle ORM
└── pnpm-workspace.yaml
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/categories` | Listar categorías |
| POST | `/api/categories` | Crear categoría |
| PATCH | `/api/categories/:id` | Actualizar categoría |
| DELETE | `/api/categories/:id` | Eliminar categoría |
| GET | `/api/products` | Listar productos (filtros: `categoryId`, `search`, `featured`) |
| POST | `/api/products` | Crear producto |
| GET | `/api/products/featured` | Productos destacados |
| PATCH | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |
| GET | `/api/stats` | Estadísticas de la tienda |

## Panel de administración

El panel de admin es accesible en `/admin` sin contraseña. Desde allí puedes:

1. **Dashboard** — ver totales de productos, categorías, destacados y activos
2. **Productos** — tabla completa con opciones de editar y eliminar; botón para agregar nuevo
3. **Categorías** — misma funcionalidad para las categorías

Todos los cambios se guardan inmediatamente en la base de datos PostgreSQL y se reflejan en el catálogo público sin necesidad de recargar.

## Regenerar el cliente de la API

Si modificas `lib/api-spec/openapi.yaml`:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Despliegue en Replit

Este proyecto está listo para desplegarse en Replit con un clic. Solo asegúrate de tener una base de datos PostgreSQL provisionada (Replit la crea automáticamente).
