import {
  addMetric,
  getChartData,
  getMetricsByType,
} from "@/controllers/metric.controller";
import { Router } from "express";

const router = Router();

router.post("/", addMetric);
router.get("/:type", getMetricsByType);
router.get("/:type/chart", getChartData);

export default router;
