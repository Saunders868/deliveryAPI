import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" | "isAdmin" | "active">
  >
) {
  try {
    const user = await UserModel.create(input);
    // console.log("user: ",user);
    
    return omit(user, "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

// validate user password and email to start a session
export async function validatePassword({
  email,
  password,
}: {
  email: object;
  password: string;
}) {
  const user = await UserModel.findOne({ "email.address": email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}

// find a specific user
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
