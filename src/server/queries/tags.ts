import { db } from "../db";
import { dbCache } from "./cache";

function getTagsInternal() {
  return db.productTag.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getTags() {
  const cacheFunc = dbCache(getTagsInternal, {
    tags: ["tags"],
  });

  return cacheFunc();
}
