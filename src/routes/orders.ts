import express from "express";
import {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderHandler,
  updateOrderHandler,
} from "../controllers/order.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireUser } from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import {
  createOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} from "../schema/order.schema";

export const orderRoutes = express.Router();

// create order
// create an order full of items to be delivered
orderRoutes.post(
  "/",
  [requireUser, validate(createOrderSchema)],
  createOrderHandler
);

// view orders RESTRICTED
// view all orders
orderRoutes.get("/", requireAdminUser, getAllOrdersHandler);

// view order RESTRICTED - admin & order owner
// view a specific order
orderRoutes.get(
  "/:orderId",
  [requireUser, validate(getOrderSchema)],
  getOrderHandler
);

// update order RESTRICTED - admin
// update specific order
orderRoutes.patch(
  "/:orderId",
  [requireAdminUser, validate(updateOrderSchema)],
  updateOrderHandler
);

// delete order RESTRICTED - admin
// delete specific order
orderRoutes.delete(
  "/:orderId",
  [requireAdminUser, validate(deleteOrderSchema)],
  deleteOrderHandler
);
