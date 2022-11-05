import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from "./user.model";

// product interface
export interface ProductDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  desc: string;
  price: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif",
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
