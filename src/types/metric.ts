import { Request } from "express";
import { DistanceUnit, TemperatureUnit } from "./unit";

export enum EMetricType {
  DISTANCE = "distance",
  TEMPERATURE = "temperature",
}

export interface IMetricInput {
  user_id: string;
  type: EMetricType;
  value: number;
  unit: string;
  date: string;
}

export interface MetricQuery {
  user_id?: string;
  unit?: DistanceUnit | TemperatureUnit;
  period?: string;
  [key: string]: string | string[] | undefined;
}

export interface AddMetricRequest extends Request {
  body: IMetricInput;
}

export interface MetricQueryRequest extends Request {
  query: MetricQuery;
  params: {
    type: EMetricType;
  };
}
