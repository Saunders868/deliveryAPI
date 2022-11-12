import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { CartDocument } from "./cart.model";
import { UserDocument } from "./user.model";

// order interface
export interface OrderDocument extends mongoose.Document {
  id: string;
  user: UserDocument["_id"];
  cart: CartDocument["id"];
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => `order_${uuidv4()}`,
    },
    cart: {
      type: String,
      ref: "Cart",
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
