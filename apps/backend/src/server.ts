import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "@/middleware/error-handler";
import {
  httpLogger,
  logBodyRequests,
  logQueryParams,
  addRequestId,
} from "@/utils/logger";
import { connectDB } from "@/config/db";
import helmet from "helmet";
import { healthRoutes } from "./routes/health.routes";
import { StatusCodes } from "http-status-codes";
import { notFoundHandler } from "./middleware/not-found-handler";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());

app.use([httpLogger, addRequestId, logBodyRequests, logQueryParams]);

// routes

app.get("/", (req, res) => {
  res.redirect("/health");
});

app.use(healthRoutes);
app.use(notFoundHandler);

app.use(errorHandler);

export { app };
