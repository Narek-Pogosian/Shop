import { db } from "@/server/db";

export default async function ShopPage() {
  const p = await db.product.findMany();

  return (
    <>
      <h1>Shop Page</h1>

      <pre>{JSON.stringify(p, null, 2)}</pre>
    </>
  );
}
