import express from "express";
import {
  createCartHandler,
  deleteCartHandler,
  getAllCartsHandler,
  getCartHandler,
  updateCartHandler,
} from "../controllers/cart.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireUser } from "../middleware/requireUser";
import { requireAuthorizedUser } from "../middleware/userAuth";
import validate from "../middleware/validateResource";
import {
  createCartSchema,
  deleteCartSchema,
  getCartSchema,
  updateCartSchema,
} from "../schema/cart.schema";

export const cartRoutes = express.Router();

// create cart
// create a cart to add products to
cartRoutes.post(
  "/",
  [requireUser, validate(createCartSchema)],
  createCartHandler
);

// view carts RESTRICTED
// view all carts
cartRoutes.get("/", requireAdminUser, getAllCartsHandler);

// view cart RESTRICTED - admin & order owner
// view a specific cart
cartRoutes.get(
  "/:cartId",
  [requireAuthorizedUser, validate(getCartSchema)],
  getCartHandler
);

// update cart RESTRICTED - admin & order owner
// update specific cart
cartRoutes.patch(
  "/:cartId",
  [requireAuthorizedUser, validate(updateCartSchema)],
  updateCartHandler
);

// remove from cart functionality NEEDED

// delete cart RESTRICTED - admin & order owner
// delete specific cart
cartRoutes.delete(
  "/:cartId",
  [requireAuthorizedUser, validate(deleteCartSchema)],
  deleteCartHandler
);
