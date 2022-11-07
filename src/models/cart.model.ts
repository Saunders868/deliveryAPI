import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ProductDocument } from "./product.model";
import { UserDocument } from "./user.model";

// product in cart interface
interface ProductInterface {
  product_id: ProductDocument["id"];
  quantity: number;
  price: ProductDocument["price"];
  title: ProductDocument["title"];
}

// cart interface
export interface CartDocument extends mongoose.Document {
  id: string;
  userId: UserDocument["_id"];
  products: [ProductInterface];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  modifiedOn: Date;
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => `cart_${uuidv4()}`,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.String,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        title: {
          type: mongoose.Schema.Types.String,
          ref: "Product",
          required: true,
        },
        price: {
          type: mongoose.Schema.Types.Number,
          ref: "Product",
          required: true,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);

export default CartModel;
