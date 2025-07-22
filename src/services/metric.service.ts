import { Metric } from "@/models/metric.model";
import { EMetricType, IMetricInput } from "@/types/metric";
import { DistanceUnit, TemperatureUnit } from "@/types/unit";
import { convertDistance, convertTemperature } from "@/utils/unit-conversion";
import { subMonths, startOfDay } from "date-fns";

function convertValueByType(
  type: EMetricType,
  value: number,
  from_unit: string,
  to_unit: string,
) {
  return type === "distance"
    ? convertDistance(value, from_unit as DistanceUnit, to_unit as DistanceUnit)
    : convertTemperature(
        value,
        from_unit as TemperatureUnit,
        to_unit as TemperatureUnit,
      );
}

export async function createMetric(input: IMetricInput) {
  const { user_id, type, value, unit, date } = input;
  return await Metric.create({
    user_id,
    type,
    value,
    unit,
    date: new Date(date),
  });
}

export async function getMetricsByType(
  type: EMetricType,
  user_id: string,
  unit?: DistanceUnit | TemperatureUnit,
) {
  const metrics = await Metric.find({ user_id, type }).sort({ date: 1 });

  if (!unit) return metrics;

  return metrics.map((m) => ({
    ...m.toObject(),
    value: unit ? convertValueByType(type, m.value, m.unit, unit) : m.value,
    unit,
  }));
}

export async function getChartData(
  type: EMetricType,
  user_id: string,
  unit?: string,
  period: string = "1month",
) {
  const now = new Date();
  const months = parseInt(period.replace("month", "")) || 1;
  const from = subMonths(now, months);

  const metrics = await Metric.find({
    user_id,
    type,
    date: { $gte: from, $lte: now },
  }).sort({ date: -1 });

  const latestPerDay = new Map<string, (typeof metrics)[0]>();

  for (const m of metrics) {
    const dayKey = startOfDay(m.date).toISOString();
    if (!latestPerDay.has(dayKey)) latestPerDay.set(dayKey, m);
  }

  const result = Array.from(latestPerDay.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((m) => ({
      date: m.date,
      value: unit ? convertValueByType(type, m.value, m.unit, unit) : m.value,
      unit: unit || m.unit,
    }));

  return result;
}
