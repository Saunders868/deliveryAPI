import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

// create a user
export async function createUser(
  input: DocumentDefinition<
    Omit<
      UserDocument,
      "createdAt" | "updatedAt" | "comparePassword" | "isAdmin" | "active"
    >
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

// find a specific user
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

// update a user
export async function updateUser(
  filter: FilterQuery<UserDocument>,
  input: DocumentDefinition<
    Omit<
      UserDocument,
      | "createdAt"
      | "updatedAt"
      | "comparePassword"
      | "isAdmin"
      | "active"
      | "password"
    >
  >,
  options: QueryOptions
) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      input,
      options
    );
    // console.log("find filter: ",filter);
    // console.log("updated user info: ",updateUser);

    // console.log("updated user: ",updatedUser);

    return omit(updatedUser, "password");
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

// delete a user
export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}
