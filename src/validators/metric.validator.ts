import { EMetricType } from "@/types/metric";
import z from "zod";

export const AddMetricSchema = z.object({
  user_id: z.string(),
  type: z.enum(EMetricType),
  value: z.number(),
  unit: z.string(),
  date: z.string(),
});

const distanceUnit = z.enum(["meter", "centimeter", "inch", "feet", "yard"]);

const temperatureUnit = z.enum(["c_temp", "f_temp", "k_temp"]);

export const GetMetricByTypeSchema = z.object({
  user_id: z.string(),
  unit: z.union([distanceUnit, temperatureUnit]).optional(),
  type: z.enum(EMetricType),
});

export const GetChartDataSchema = z.object({
  user_id: z.string(),
  unit: z.union([distanceUnit, temperatureUnit]).optional(),
  type: z.enum(EMetricType),
  period: z.string().optional(),
});
