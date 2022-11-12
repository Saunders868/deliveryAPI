import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderModel from "../models/order.model";
import {
  CreateOrderInput,
  DeleteOrderInput,
  GetOrderInput,
  UpdateOrderInput,
} from "../schema/order.schema";
import { findCart } from "../service/cart.service";
import {
  createOrder,
  deleteOrder,
  findOrder,
  updateOrder,
} from "../service/order.service";
import logger from "../utils/logger";

// create a order
export async function createOrderHandler(
  req: Request<{}, {}, CreateOrderInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const cart = await findCart({ user: userId });

    const body = req.body;

    if (cart) {
      const order = await createOrder({ ...body, user: userId, cart: cart.id });
      return res.send(order);
    }
    return res.sendStatus(404);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
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
// basically if it is completed or not
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
