import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import CartModel, { CartDocument } from "../models/cart.model";
import { findProduct } from "./product.service";

// create a cart
export async function createCart(
  input: DocumentDefinition<
    Omit<
      CartDocument,
      "createdAt" | "updatedAt" | "id" | "active" | "modifiedOn"
    >
  >
) {
  try {
    const cart = await CartModel.create(input);

    return cart;
  } catch (e: any) {
    throw new Error(e);
  }
}

// find a cart
export async function findCart(
  query: FilterQuery<CartDocument>,
  options: QueryOptions = { lean: true }
) {
  return CartModel.findOne(query, {}, options);
}

// update a cart
export async function updateCart(
  // input: object,
  query: FilterQuery<CartDocument>,
  productId: string,
  quantity: number,
  title: string,
  price: number
) {
  try {
    const cart = await CartModel.findOne(query);

    if (!cart) {
      return "cart null";
      // could create a cart here
    }

    // get product id from controller
    // will be passed through body of request
    const product_id = productId;

    // find the index of the product to update
    // finds the index of the product that matches the productid sent through the request
    const itemIndex = cart.products.findIndex(
      (p) => p.product_id == product_id
    );

    // this means that the product exists
    if (itemIndex > -1) {
      // sets productItem variable to object at correct index as deiscovered before
      let productItem = cart.products[itemIndex];
      //product exists in the cart, update the quantity
      productItem.quantity = productItem.quantity + quantity;
      productItem.price = productItem.quantity * price;
      cart.products[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.products.push({ product_id, quantity, title, price });
    }

    await cart.save();
    return cart;
  } catch (e: any) {
    throw new Error(e);
  }
}

// delete a order
export async function deleteCart(query: FilterQuery<CartDocument>) {
  return CartModel.deleteOne(query);
}
