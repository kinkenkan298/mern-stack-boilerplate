import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/error-handler";
import { logBodyRequests, logQueryParams, requestLogger } from "./logger";
import { connectDB } from "./db";

const app = express();

app.use(requestLogger);
app.use(logBodyRequests);
app.use(logQueryParams);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

await connectDB();

// routes

app.get("/health", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Backend is healthy",
  });
});

app.get("/", (req, res) => {
  res.send("Hallo backend!");
});

app.use(errorHandler);

export { app };
