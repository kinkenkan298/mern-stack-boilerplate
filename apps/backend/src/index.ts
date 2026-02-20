import { app } from "./server";
import { logger } from "./utils/logger";
import { configureGracefulShutdown } from "./utils/shutdown";
import { env } from "./config/env";
import { connectDB } from "./config/db";

connectDB()
  .then(() => {
    const server = app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });

    configureGracefulShutdown(server);
  })
  .catch((error) => {
    logger.error("Failed to connect to the database:", error);
    process.exit(1);
  });
