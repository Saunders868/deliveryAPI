import { Express, Request, Response } from "express";
import { userRoutes } from "./routes/users";
import { productRoutes } from "./routes/products";
import { sessionRoutes } from "./routes/session";
import { orderRoutes } from "./routes/orders";

// create all routes for the project
function routes(app: Express) {
  // this route is just a check to ensure the api is working
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // session routes
  app.use("/api/sessions", sessionRoutes);

  // users routes
  app.use("/api/users", userRoutes);

  // product routes
  app.use("/api/products", productRoutes);

  // order routes
  app.use("/api/orders", orderRoutes);
}

export default routes;
