import { Request, Response } from "express";
import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, updateUser } from "../service/user.service";
import logger from "../utils/logger";
import { omit } from "lodash";
import UserModel from "../models/user.model";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// get all users
export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await UserModel.find();
  return res.send(users);
}

// get a specific user
export async function getUserHandler(req: Request, res: Response) {
  const user = await findUser({ _id: req.params.id });
  return res.send(user);
}

// update user
export async function updateUserHandler(
  req: Request<{}, {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const user = res.locals.user;
    // console.log("find user/ user to update:",user);
    

    const updatedUser = await updateUser({id: user?._id}, req.body)
    // console.log("req.body",req.body);
    
    return res.send(omit(updatedUser.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
