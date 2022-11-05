import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ProductDocument } from "./product.model";
import { UserDocument } from "./user.model";

// order interface
export interface OrderDocument extends mongoose.Document {
  id: string;
  user: UserDocument["_id"];
  items: [ProductDocument["_id"]];
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
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
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
