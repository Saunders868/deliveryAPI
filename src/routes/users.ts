import express from "express";
export const userRoutes = express.Router();
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireAuthorizedUser } from "../middleware/userAuth";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "../schema/user.schema";

// sign up route
// used to create a user
userRoutes.post("/", validate(createUserSchema), createUserHandler);

// get all users
// view users route
// see all users of the app RESRICTED - admin
userRoutes.get("/", requireAdminUser, getAllUsersHandler);

// get user
// view user route
// see specific user information RESTRICTED - admin & user
userRoutes.get("/:id", [requireAuthorizedUser, validate(getUserSchema)], getUserHandler);

// update user info RESTRICTED  - profile owner
// update all info for a specific user
userRoutes.patch("/:id", [requireAuthorizedUser, validate(updateUserSchema)], updateUserHandler);

// route to delete a user
userRoutes.delete("/:id", [requireAuthorizedUser, validate(deleteUserSchema)], deleteUserHandler);
