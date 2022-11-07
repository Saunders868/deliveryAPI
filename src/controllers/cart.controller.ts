import { Request, Response } from "express";
import CartModel from "../models/cart.model";
import {
  CreateCartInput,
  DeleteCartInput,
  GetCartInput,
  UpdateCartInput,
} from "../schema/cart.schema";
import {
  createCart,
  deleteCart,
  findCart,
  updateCart,
} from "../service/cart.service";
import { findProduct } from "../service/product.service";
import logger from "../utils/logger";

// how to create a cart on login / specific page
// create a cart
export async function createCartHandler(
  req: Request<{}, {}, CreateCartInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const { product_id, quantity } = req.body.products[0];

    const product = await findProduct({ id: product_id });

    if (product) {
      const title = product.title;
      const price = product.price;
      const products = [{title, price, product_id, quantity}]
      const cart = await createCart({ products, userId });
      return res.send(cart);
    }

    return res.sendStatus(404);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// get all carts
export async function getAllCartsHandler(req: Request, res: Response) {
  const carts = await CartModel.find();
  return res.send(carts);
}

// get a cart
export async function getCartHandler(
  req: Request<GetCartInput["params"]>,
  res: Response
) {
  try {
    const cartId = req.params.cartId;
    const cart = await findCart({ id: cartId });

    if (!cart) {
      return res.sendStatus(404);
    }

    return res.send(cart);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// update a cart
export async function updateCartHandler(
  req: Request<UpdateCartInput["params"], {}, UpdateCartInput["body"]>,
  res: Response
) {
  try {
    const cartId = req.params.cartId;

    // gets the product id and quantity from the req body
    //  it would always be the first index of the array, as it's an array with one item being sent
    const { product_id, quantity } = req.body.products[0];

    // get the product that matches the id in request
    const product = await findProduct({ id: product_id });
    if (product) {
      // set title
      const title = product.title;
      // set price
      const price = product.price;
      const updatedCart = await updateCart(
        { id: cartId },
        product_id,
        quantity,
        title,
        price
      );
      return res.send(updatedCart);
    }

    if (!product) {
      return res.sendStatus(404);
    }

    const cart = await findCart({ id: cartId });
    if (!cart) {
      return res.sendStatus(404);
    }
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// delete a cart
export async function deleteCartHandler(
  req: Request<DeleteCartInput["params"]>,
  res: Response
) {
  try {
    const cartId = req.params.cartId;
    const cart = await findCart({ id: cartId });

    if (!cart) {
      return res.sendStatus(404);
    }

    await deleteCart({ cartId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
