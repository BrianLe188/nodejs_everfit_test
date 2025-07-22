import { COLLECTION_NAME } from "@/constants/coll-name";
import { EMetricType } from "@/types/metric";
import mongoose from "mongoose";

const metricSchema = new mongoose.Schema(
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

export const Metric = mongoose.model(COLLECTION_NAME.METRICS, metricSchema);
