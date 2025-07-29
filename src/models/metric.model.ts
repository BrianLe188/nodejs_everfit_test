import { COLLECTION_NAME } from "@/constants/coll-name";
import { EMetricType } from "@/types/metric";
import { IBaseDocument } from "@/utils/base-repository";
import mongoose from "mongoose";

export interface IMetric extends IBaseDocument {
  user_id: string;
  date: Date;
  type: EMetricType;
  value: number;
  unit: string;
}

const metricSchema = new mongoose.Schema<IMetric>(
  {
    user_id: { type: String, required: true },
    type: { type: String, enum: EMetricType, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const Metric = mongoose.model<IMetric>(
  COLLECTION_NAME.METRICS,
  metricSchema,
);
