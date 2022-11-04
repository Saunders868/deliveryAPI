import { number, object, string, TypeOf } from "zod";

const payload = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    desc: string({
      required_error: "description is required",
    }).min(120, "desc shoild be at least 120 chars"),
    price: number({
      required_error: "price is required",
    }),
  }),
});

const params = {
  params: object({
    productId: string({
      required_error: "product id is required",
    }),
  }),
};

export const createProductSchema = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    desc: string({
      required_error: "description is required",
    }).min(120, "desc shoild be at least 120 chars"),
    price: number({
      required_error: "price is required",
    }),
  }),
});

export const getProductSchema = object({
  params: object({
    productId: string({
      required_error: "product id is required",
    }),
  }),
});

export const updateProductSchema = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    desc: string({
      required_error: "description is required",
    }).min(120, "desc shoild be at least 120 chars"),
    price: number({
      required_error: "price is required",
    }),
  }),
  params: object({
    productId: string({
      required_error: "product id is required",
    }),
  }),
});

export const deleteProductSchema = object({
  params: object({
    productId: string({
      required_error: "product id is required",
    }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
