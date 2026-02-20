import { detailedHealthCheck, healthCheck } from "@/service/health.service";
import { Router } from "express";

const healthRoutes: Router = Router();

healthRoutes.get("/health", healthCheck);
healthRoutes.get("/health/detailed", detailedHealthCheck);
export { healthRoutes };
