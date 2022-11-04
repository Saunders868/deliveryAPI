import express from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controllers/session.controller";
import { requireAdminUser } from "../middleware/adminUser";
import { requireUser } from "../middleware/requireUser";
import validate from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
export const sessionRoutes = express.Router();

// get all user sessions
// restricted route - ADMIN ONLY
sessionRoutes.get("/", requireAdminUser, getUserSessionsHandler);

// sign in route
// used to create a session: encodes the user information in a jwt token that is then put into the res.locals
sessionRoutes.post(
  "/",
  validate(createSessionSchema),
  createUserSessionHandler
);

// sign out route
// used to set accessToken and refreshToken to null
sessionRoutes.delete("/", requireUser, deleteSessionHandler);
