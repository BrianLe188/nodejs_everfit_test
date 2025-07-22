import express from "express";
import bodyParser from "body-parser";
import metricRoutes from "@/routes/metric.route";

const app = express();

app.use(bodyParser.json());

app.use("/metrics", metricRoutes);

export default app;
