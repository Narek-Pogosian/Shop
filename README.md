- Add tags field array on product form

Update products table in neon console

```sql
-- Add a tsvector column for full-text search
ALTER TABLE "Product" ADD COLUMN search_vector tsvector;

-- Update the search_vector column with data from the 'name' and 'description' fields
UPDATE "Product"
SET search_vector = to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(category, ''));

-- Create a GIN index on the search_vector column
CREATE INDEX idx_product_search_vector ON "Product" USING GIN(search_vector);

-- Create a trigger to update the search_vector when a product is inserted or updated
CREATE TRIGGER update_search_vector
BEFORE INSERT OR UPDATE ON "Product"
FOR EACH ROW
EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', name, description);
```

```js
async function searchProducts(searchTerm: string) {
const products = await prisma.$queryRaw`SELECT * FROM "Product" WHERE search_vector @@ plainto_tsquery('english', ${searchTerm})`;

return products;
}

const products = await prisma.$queryRaw`
  SELECT *, ts_rank(search_vector, plainto_tsquery('english', ${searchTerm})) AS rank
  FROM "Product"
  WHERE search_vector @@ plainto_tsquery('english', ${searchTerm})
  ORDER BY rank DESC
`;

async function findSimilarProducts(productId: number) {
  // Fetch the product's name and description
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { name: true, description: true },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  // Generate the full-text query from the product's name and description
  const searchQuery = `${product.name} ${product.description}`;

  // Find similar products using full-text search
  const similarProducts = await prisma.$queryRaw`
    SELECT *, ts_rank(search_vector, plainto_tsquery('english', ${searchQuery})) AS rank
    FROM "Product"
    WHERE search_vector @@ plainto_tsquery('english', ${searchQuery})
      AND "Product".id != ${productId}  -- Exclude the current product
    ORDER BY rank DESC
    LIMIT 5;  -- Limit the number of similar products
  `;

  return similarProducts;
}

async function findSimilarProductsBySearchTerm(searchTerm: string) {
  // Find similar products using full-text search
  const similarProducts = await prisma.$queryRaw`
    SELECT *, ts_rank(search_vector, plainto_tsquery('english', ${searchTerm})) AS rank
    FROM "Product"
    WHERE search_vector @@ plainto_tsquery('english', ${searchTerm})
    ORDER BY rank DESC
    LIMIT 5;  -- Limit the number of similar products
  `;

  return similarProducts;
}

```
