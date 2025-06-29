import { parseAttributes } from "@/lib/utils/params";
import { z } from "zod";

const productAttribute = z.object({
  name: z.string().trim().min(1),
  values: z.array(z.string()).min(1),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  slug: z.string().trim().min(1, { message: "Slug is required" }),
  poster: z.string().trim().min(1, { message: "Poster is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  productAttributes: z.array(productAttribute).min(1),
  tags: z.array(z.object({ name: z.string().trim().min(1) })),
  categorySlug: z.string().min(1, { message: "Categery is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be a number greater than 0",
    }),
});

export const productQueryParams = z.object({
  category: z.string().optional(),
  min_price: z.coerce.number().gte(0).optional(),
  max_price: z.coerce.number().gte(0).optional(),
  page: z.coerce.number().int().gte(1).optional(),
  sort_by: z.string().optional(),
  dir: z.enum(["asc", "desc"]).optional(),
  tags: z
    .string()
    .optional()
    .transform((str) => {
      return str?.split(",").map(Number);
    }),
  attributes: z
    .string()
    .optional()
    .transform((attr) => {
      return attr ? parseAttributes(attr) : undefined;
    }),
});

export type Attribute = z.infer<typeof productAttribute>;
export type CreateProductsSchemaType = z.infer<typeof createProductSchema>;
export type ProductQueryParamsType = z.infer<typeof productQueryParams>;
