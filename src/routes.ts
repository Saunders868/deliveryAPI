import { Express, Request, Response } from "express";
import { userRoutes } from "./routes/users";
import { productRoutes } from "./routes/products";
import { sessionRoutes } from "./routes/session";

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
