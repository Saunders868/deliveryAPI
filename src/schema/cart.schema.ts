import { array, number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    products: array(
      object({
        product_id: string(),
        quantity: number(),
      })
    ),
  }),
};

const params = {
  params: object({
    cartId: string({
      required_error: "cart id needed",
    }),
  }),
};

export const createCartSchema = object({
  ...payload,
});

export const getCartSchema = object({
  ...params,
});

export const updateCartSchema = object({
  ...payload,
  ...params,
});

export const deleteCartSchema = object({
  ...params,
});

export type CreateCartInput = TypeOf<typeof createCartSchema>;
export type GetCartInput = TypeOf<typeof getCartSchema>;
export type UpdateCartInput = TypeOf<typeof updateCartSchema>;
export type DeleteCartInput = TypeOf<typeof deleteCartSchema>;
