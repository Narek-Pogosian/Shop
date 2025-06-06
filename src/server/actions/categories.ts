"use server";

import { createCategorySchema } from "@/lib/schemas/category-schemas";
import { revalidateDbCache } from "../queries/cache";
import { adminActionClient } from ".";
import { db } from "../db";
import { z } from "zod";

export const deleteCategoryAction = adminActionClient
  .schema(z.number())
  .action(async ({ parsedInput }) => {
    await db.category.delete({ where: { id: parsedInput } });
    revalidateDbCache("categories");
    revalidateDbCache("products");
  });

export const createCategoryAction = adminActionClient
  .schema(createCategorySchema)
  .action(async ({ parsedInput }) => {
    const result = await db.$transaction(async (prisma) => {
      const category = await prisma.category.create({
        data: {
          name: parsedInput.name,
          slug: parsedInput.slug,
          description: parsedInput.description,
        },
      });

      const attributesWithCategoryId = parsedInput.attributes
        ? parsedInput.attributes.map((attribute) => ({
            ...attribute,
            categoryId: category.id,
          }))
        : [];

      await prisma.categoryAttribute.createMany({
        data: attributesWithCategoryId,
      });

      return {
        category,
        categoryAttributes: attributesWithCategoryId,
      };
    });

    if (result) {
      revalidateDbCache("categories");
    }

    return result;
  });
