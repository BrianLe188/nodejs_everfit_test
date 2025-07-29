import { Response } from "express";
import * as metricService from "@/services/metric.service";
import { AddMetricRequest, MetricQueryRequest } from "@/types/metric";
import {
  AddMetricSchema,
  GetChartDataSchema,
  GetMetricByTypeSchema,
} from "@/validators/metric.validator";
import { errorHandler, successHandler } from "@/utils/error-handling";

export async function addMetric(req: AddMetricRequest, res: Response) {
  try {
    const validateResult = AddMetricSchema.safeParse(req.body);

    if (!validateResult.success) {
      return errorHandler(res, validateResult.error, 400);
    }

    const { user_id, type, value, unit, date } = validateResult.data;

    const metric = await metricService.createMetric({
      user_id,
      type,
      value,
      unit,
      date: new Date(date),
    });

    successHandler(res, 201, metric);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getMetricsByType(req: MetricQueryRequest, res: Response) {
  try {
    const validateResult = GetMetricByTypeSchema.safeParse({
      ...req.query,
      ...req.params,
    });

    if (!validateResult.success) {
      return errorHandler(res, validateResult.error, 400);
    }

    const { user_id, unit, type } = validateResult.data;

    const metrics = await metricService.getMetricsByType(
      type,
      user_id as string,
      unit,
    );

    successHandler(res, 200, metrics);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChartData(req: MetricQueryRequest, res: Response) {
  try {
    const validateResult = GetChartDataSchema.safeParse({
      ...req.query,
      ...req.params,
    });

    if (!validateResult.success) {
      return errorHandler(res, validateResult.error, 400);
    }

    const { user_id, unit, period = "1month", type } = validateResult.data;

    const data = await metricService.getChartData(
      type,
      user_id as string,
      unit,
      period,
    );

    successHandler(res, 200, data);
  } catch (error) {
    errorHandler(res, error);
  }
}
