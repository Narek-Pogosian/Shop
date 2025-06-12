import type { Attribute } from "../schemas/product-schemas";

export function encodeTags(tags: number[], params: URLSearchParams) {
  const encoded = tags.map(encodeURIComponent).join(",");
  params.set("tags", encoded);
}

export function decodeTags(params: URLSearchParams): number[] {
  const encoded = params.get("tags");
  if (!encoded) return [];

  return encoded.split(",").map(decodeURIComponent).map(Number);
}

export function getNumberFromParams(key: string, params: URLSearchParams) {
  const val = params.get(key);
  if (!val) {
    return;
  }

  const num = Number(val);
  if (isNaN(num) || num == 0) {
    return;
  }

  return num;
}

export function encodeAttributes(
  attributes: Attribute[],
  params: URLSearchParams,
) {
  const attrsStr = attributes
    .map((attr) => `${attr.name}:${attr.values.join(",")}`)
    .join(";");

  params.set("attributes", attrsStr);
}

export function decodeAttributes(params: URLSearchParams): Attribute[] {
  const raw = params.get("attributes");
  if (!raw) return [];

  const decoded = raw.split(";").map((pair) => {
    const [name, valuesStr] = pair.split(":");
    if (!name || !valuesStr) return { name: "", values: [] };

    return { name, values: valuesStr?.split(",") ?? [] };
  });

  return decoded;
}

export function parseAttributes(attributesStr: string): Attribute[] {
  if (!attributesStr) return [];

  const attributes = attributesStr
    .split(";")
    .map((pair) => {
      const [name, valuesStr] = pair.split(":");
      if (!name || !valuesStr) return null;
      const values = valuesStr.split(",").filter(Boolean);
      return { name, values };
    })
    .filter((attr): attr is Attribute => attr !== null);

  return attributes;
}
