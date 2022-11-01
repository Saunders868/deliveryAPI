import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";

// create all routes for the project
function routes(app: Express) {
  // this route is just a check to ensure the api is working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default routes;
