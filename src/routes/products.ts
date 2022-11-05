import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireUser } from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema";
export const productRoutes = express.Router();

// create a product
productRoutes.post(
  "/",
  [requireAdminUser, validate(createProductSchema)],
  createProductHandler
);

// get all products
productRoutes.get(
  "/",
  requireUser,
  getAllProductsHandler
);

// get a product
productRoutes.get(
  "/:productId",
  [requireUser, validate(getProductSchema)],
  getProductHandler
);

// update a product
productRoutes.patch(
  "/:productId",
  [requireAdminUser, validate(updateProductSchema)],
  updateProductHandler
);

// delete a product
productRoutes.delete(
  "/:productId",
  [requireAdminUser, validate(deleteProductSchema)],
  deleteProductHandler
);
