import { Router, type IRouter } from "express";
import { eq, ilike, and, type SQL } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import {
  CreateProductBody,
  GetProductParams,
  GetProductResponse,
  UpdateProductParams,
  UpdateProductBody,
  UpdateProductResponse,
  DeleteProductParams,
  ListProductsQueryParams,
  ListProductsResponse,
  GetFeaturedProductsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  longDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  imageUrl: string | null;
  categoryId: number;
  categoryName?: string | null;
  brand: string | null;
  unit: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  createdAt: Date;
};

function mapProduct(p: ProductRow) {
  return {
    ...p,
    categoryName: p.categoryName ?? null,
    createdAt: p.createdAt.toISOString(),
  };
}

router.get("/products/featured", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      slug: productsTable.slug,
      description: productsTable.description,
      longDescription: productsTable.longDescription,
      price: productsTable.price,
      compareAtPrice: productsTable.compareAtPrice,
      imageUrl: productsTable.imageUrl,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      brand: productsTable.brand,
      unit: productsTable.unit,
      stock: productsTable.stock,
      featured: productsTable.featured,
      active: productsTable.active,
      createdAt: productsTable.createdAt,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(and(eq(productsTable.featured, true), eq(productsTable.active, true)));

  res.json(GetFeaturedProductsResponse.parse(rows.map(mapProduct)));
});

router.get("/products", async (req, res): Promise<void> => {
  const query = ListProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const conditions: SQL[] = [];
  if (query.data.categoryId != null) {
    conditions.push(eq(productsTable.categoryId, query.data.categoryId));
  }
  if (query.data.search) {
    conditions.push(ilike(productsTable.name, `%${query.data.search}%`));
  }
  if (query.data.featured != null) {
    conditions.push(eq(productsTable.featured, query.data.featured));
  }

  const rows = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      slug: productsTable.slug,
      description: productsTable.description,
      longDescription: productsTable.longDescription,
      price: productsTable.price,
      compareAtPrice: productsTable.compareAtPrice,
      imageUrl: productsTable.imageUrl,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      brand: productsTable.brand,
      unit: productsTable.unit,
      stock: productsTable.stock,
      featured: productsTable.featured,
      active: productsTable.active,
      createdAt: productsTable.createdAt,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json(ListProductsResponse.parse(rows.map(mapProduct)));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [inserted] = await db.insert(productsTable).values(parsed.data).returning();
  const [row] = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      slug: productsTable.slug,
      description: productsTable.description,
      longDescription: productsTable.longDescription,
      price: productsTable.price,
      compareAtPrice: productsTable.compareAtPrice,
      imageUrl: productsTable.imageUrl,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      brand: productsTable.brand,
      unit: productsTable.unit,
      stock: productsTable.stock,
      featured: productsTable.featured,
      active: productsTable.active,
      createdAt: productsTable.createdAt,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.id, inserted.id));
  res.status(201).json(GetProductResponse.parse(mapProduct(row)));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      slug: productsTable.slug,
      description: productsTable.description,
      longDescription: productsTable.longDescription,
      price: productsTable.price,
      compareAtPrice: productsTable.compareAtPrice,
      imageUrl: productsTable.imageUrl,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      brand: productsTable.brand,
      unit: productsTable.unit,
      stock: productsTable.stock,
      featured: productsTable.featured,
      active: productsTable.active,
      createdAt: productsTable.createdAt,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(GetProductResponse.parse(mapProduct(row)));
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [updated] = await db
    .update(productsTable)
    .set(parsed.data)
    .where(eq(productsTable.id, params.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const [row] = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      slug: productsTable.slug,
      description: productsTable.description,
      longDescription: productsTable.longDescription,
      price: productsTable.price,
      compareAtPrice: productsTable.compareAtPrice,
      imageUrl: productsTable.imageUrl,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      brand: productsTable.brand,
      unit: productsTable.unit,
      stock: productsTable.stock,
      featured: productsTable.featured,
      active: productsTable.active,
      createdAt: productsTable.createdAt,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.id, updated.id));
  res.json(UpdateProductResponse.parse(mapProduct(row)));
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.delete(productsTable).where(eq(productsTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
