import { db } from "../db";

const products = await db.product.findMany({
  where: {
    AND: [
      {
        productAttributes: {
          some: {
            name: "size",
            values: {
              every: {
                value: {
                  in: ["40", "41", "42"],
                },
              },
            },
          },
        },
      },
      {
        productAttributes: {
          some: {
            name: "color",
            values: {
              every: {
                value: {
                  in: ["black", "red"],
                },
              },
            },
          },
        },
      },
    ],
  },
  include: {
    productAttributes: {
      include: {
        values: true,
      },
    },
  },
});
