import express, { Express } from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";

function createServer(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(deserializeUser);
  routes(app);

  return app;
}

export default createServer;
