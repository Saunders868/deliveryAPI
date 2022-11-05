import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderModel from "../models/order.model";
import {
  CreateOrderInput,
  DeleteOrderInput,
  GetOrderInput,
  UpdateOrderInput,
} from "../schema/order.schema";
import {
  createOrder,
  deleteOrder,
  findOrder,
  updateOrder,
} from "../service/order.service";
import { findProduct } from "../service/product.service";
import logger from "../utils/logger";

// create a order
export async function createOrderHandler(
  req: Request<{}, {}, CreateOrderInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const items = [Object(mongoose.Schema.Types.ObjectId)];
    const body = req.body;
    const order = await createOrder({ ...body, user: userId, items: items });
    return res.send(order);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// finds the product and order objects to add to the items array in orders
// create a cart (POST)
// store in res.locals / local storage
// get cart when adding product to it(find cart then push to it/ update it)
// add to cart
// make the cart an object with an array of strings. the string in this case would be the product ids, also a quantity value
// put the cart into the order document. the cart would contain the product ids which you can then use to find the products
export async function createOrderHelper(productId: string, orderId: string) {
  const product = await findProduct({ productId });
  const order = await findOrder({ orderId });
  console.log("order: ",order);
  console.log("product: ",product);
  
  return {product, order}
}

// get all orders
export async function getAllOrdersHandler(req: Request, res: Response) {
  const orders = await OrderModel.find();
  return res.send(orders);
}

// get a order
export async function getOrderHandler(
  req: Request<GetOrderInput["params"]>,
  res: Response
) {
  try {
    // const userId = res.locals.user._id;
    const orderId = req.params.orderId;
    const order = await findOrder({ id: orderId });

    if (!order) {
      return res.sendStatus(404);
    }
    return res.send(order);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// update a order
export async function updateOrderHandler(
  req: Request<UpdateOrderInput["params"], {}, UpdateOrderInput["body"]>,
  res: Response
) {
  try {
    const user = res.locals.user._id;
    const orderId = req.params.orderId;
    const update = req.body;
    const order = await findOrder({ id: orderId });

    if (!order) {
      return res.sendStatus(404);
    }

    const updatedOrder = await updateOrder(
      { id: orderId },
      { ...update, user },
      { new: true }
    );

    return res.send(updatedOrder);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// delete a order
export async function deleteOrderHandler(
  req: Request<DeleteOrderInput["params"]>,
  res: Response
) {
  try {
    const orderId = req.params.orderId;

    const order = await findOrder({ orderId });

    if (!order) {
      return res.sendStatus(404);
    }
    await deleteOrder({ orderId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
