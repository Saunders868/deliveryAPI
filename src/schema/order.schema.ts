import { boolean, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    isCompleted: boolean(),
  }),
};

const params = {
  params: object({
    orderId: string({
      required_error: "order id is required",
    }),
  }),
};

export const createOrderSchema = object({
  ...payload,
});

export const getOrderSchema = object({
  ...params,
});

export const updateOrderSchema = object({
  ...payload,
  ...params,
});

export const deleteOrderSchema = object({
  ...params,
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>;
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>;
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>;
export type GetOrderInput = TypeOf<typeof getOrderSchema>;
