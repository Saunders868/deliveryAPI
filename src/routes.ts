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

import { userRoutes } from "./routes/users";

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

  // update above routes to match
  // sign up route
  // used to create a user

  app.use("/api/users", userRoutes);

  // MAYBE
  // // create item
  // // view items
  // // view specific items
  // // update specific item
  // // delete specific item

  // create order
  // create an order full of items to be delivered

  // view orders RESTRICTED
  // view all orders

  // view order RESTRICTED - admin & order owner
  // view a specific order

  // update order RESTRICTED - admin & order owner
  // update specific order

  // delete order RESTRICTED - admin & order owner
  // delete specific order
}

export default routes;
