import express from "express";
import { getAllUsersHandler, getUserHandler, updateUserHandler } from "../controllers/user.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireAuthorizedUser } from "../middleware/userAuth";
export const userRoutes = express.Router();

// get all users
// view users route
// see all users of the app RESRICTED - admin
userRoutes.get("/", requireAdminUser, getAllUsersHandler);

// get user
// view user route
// see specific user information RESTRICTED - admin & user
userRoutes.get("/:id", requireAuthorizedUser, getUserHandler);

// update user info RESTRICTED  - profile owner
// update all info for a specific user
userRoutes.patch("/:id", requireAuthorizedUser, updateUserHandler);

// login route
// logs user in or starts a session

// logout route
// logs user out or ends/delete/update a session
