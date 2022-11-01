import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

// connect to mongoDB database using mongoose package
function connect() {
  const dbUri = config.get<string>("dbUri");

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to DB");
    })
    .catch((error) => {
      logger.error("Could not connect to DB");
      process.exit(1);
    });
}

export default connect;
