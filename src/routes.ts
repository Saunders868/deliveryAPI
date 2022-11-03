import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import { requireUser } from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

// create all routes for the project
function routes(app: Express) {
  // this route is just a check to ensure the api is working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;