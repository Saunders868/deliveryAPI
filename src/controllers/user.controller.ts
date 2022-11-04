import { Request, Response } from "express";
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
} from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  findUser,
  updateUser,
} from "../service/user.service";
import logger from "../utils/logger";
import { omit } from "lodash";
import UserModel from "../models/user.model";

// create a user
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
export async function getUserHandler(
  req: Request<GetUserInput["params"]>,
  res: Response
) {
  const user = await findUser({ _id: req.params.id });
  if (!user) {
    return res.sendStatus(404);
  }
  return res.send(user);
}

// update user
export async function updateUserHandler(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const userId = req.params.id;
    const update = req.body;
    const user = await findUser({ _id: userId });
    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await updateUser({ _id: userId }, update, {
      new: true,
    });

    return res.send(omit(updatedUser.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}

// delete a user
export async function deleteUserHandler(
  req: Request<DeleteUserInput["params"]>,
  res: Response
) {
  try {
    const userId = req.params.id;

    const user = await findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }
    await deleteUser({ userId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
