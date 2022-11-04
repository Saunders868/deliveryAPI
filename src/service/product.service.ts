import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

// create a product
export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  try {
    const product = await ProductModel.create(input);

    return product;
  } catch (e: any) {
    throw new Error(e);
  }
}

// find a product
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options);
}

// update a product
export async function updateProduct(
  filter: FilterQuery<ProductDocument>,
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>,
  options: QueryOptions
) {
  try {
    const product = await ProductModel.findOneAndUpdate(filter, input, options);

    return product;
  } catch (e: any) {
    throw new Error(e);
  }
}

// delete a product
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
