import { RESPONSE_MESSAGE } from "@/constants/message";
import { Response } from "express";
import * as metricService from "@/services/metric.service";
import { AddMetricRequest, MetricQueryRequest } from "@/types/metric";

export async function addMetric(req: AddMetricRequest, res: Response) {
  try {
    const { user_id, type, value, unit, date } = req.body;

    const metric = await metricService.createMetric({
      user_id,
      type,
      value,
      unit,
      date,
    });

    res.status(201).json(metric);
  } catch (error) {
    res.status(400).json({ error: RESPONSE_MESSAGE.SOMETHING_WENT_WRONG });
  }
}

export async function getMetricsByType(req: MetricQueryRequest, res: Response) {
  try {
    const { user_id, unit } = req.query;
    const { type } = req.params;

    const metrics = await metricService.getMetricsByType(
      type,
      user_id as string,
      unit,
    );

    res.json(metrics);
  } catch (error) {
    res.status(400).json({ error: RESPONSE_MESSAGE.SOMETHING_WENT_WRONG });
  }
}

export async function getChartData(req: MetricQueryRequest, res: Response) {
  try {
    const { user_id, unit, period = "1month" } = req.query;
    const { type } = req.params;

    const data = await metricService.getChartData(
      type,
      user_id as string,
      unit,
      period,
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: RESPONSE_MESSAGE.SOMETHING_WENT_WRONG });
  }
}
