import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from "../service/product.service";
import logger from "../utils/logger";

// create a product
export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// get all products
export async function getAllProductsHandler(req: Request, res: Response) {
  const products = await ProductModel.find();
  return res.send(products);
}

// get a product
export async function getProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    // const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ id: productId });

    if (!product) {
      return res.sendStatus(404);
    }

    // just add middleware for route
    // if (String(product.user) !== userId) {
    //   return res.sendStatus(403);
    // }
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// update a product
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response
) {
  try {
    const user = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ id: productId });

    if (!product) {
      return res.sendStatus(404);
    }

    const updatedProduct = await updateProduct(
      { id: productId },
      { ...update, user },
      { new: true }
    );

    return res.send(updatedProduct);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// delete a product
export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }
    await deleteProduct({ productId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
