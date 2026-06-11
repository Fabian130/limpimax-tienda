import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [[totalProducts], [totalCategories], [featuredProducts], [activeProducts]] = await Promise.all([
    db.select({ count: count() }).from(productsTable),
    db.select({ count: count() }).from(categoriesTable),
    db.select({ count: count() }).from(productsTable).where(eq(productsTable.featured, true)),
    db.select({ count: count() }).from(productsTable).where(eq(productsTable.active, true)),
  ]);

  res.json(
    GetStatsResponse.parse({
      totalProducts: Number(totalProducts.count),
      totalCategories: Number(totalCategories.count),
      featuredProducts: Number(featuredProducts.count),
      activeProducts: Number(activeProducts.count),
    })
  );
});

export default router;
