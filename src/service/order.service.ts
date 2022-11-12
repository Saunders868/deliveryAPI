import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import OrderModel, { OrderDocument } from "../models/order.model";

// create a order
export async function createOrder(
  input: DocumentDefinition<Omit<OrderDocument, "createdAt" | "updatedAt" | "id" | "isCompleted">>
) {
  try {
    const order = await OrderModel.create(input);

    return order;
  } catch (e: any) {
    throw new Error(e);
  }
}

// find a order
export async function findOrder(
  query: FilterQuery<OrderDocument>,
  options: QueryOptions = { lean: true }
) {
  return OrderModel.findOne(query, {}, options);
}

// update a order
export async function updateOrder(
  filter: FilterQuery<OrderDocument>,
  input: DocumentDefinition<Omit<OrderDocument, "createdAt" | "updatedAt" | "id" | "cart">>,
  options: QueryOptions
) {
  try {
    const order = await OrderModel.findOneAndUpdate(filter, input, options);

    return order;
  } catch (e: any) {
    throw new Error(e);
  }
}

// delete a order
export async function deleteOrder(query: FilterQuery<OrderDocument>) {
  return OrderModel.deleteOne(query);
}
