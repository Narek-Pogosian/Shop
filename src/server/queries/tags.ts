import { db } from "../db";
import { dbCache } from "./cache";

function getTagsInternal(categoryId: number) {
  return db.categoryTag.findMany({
    orderBy: { name: "asc" },
    where: { categoryId },
  });
}

export async function getTags(categoryId: number) {
  const cacheFunc = dbCache(getTagsInternal, {
    tags: [`tags-${categoryId}`],
  });

  return cacheFunc(categoryId);
}
