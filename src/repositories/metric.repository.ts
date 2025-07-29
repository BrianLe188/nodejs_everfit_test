import { IMetric, Metric } from "@/models/metric.model";
import { BaseRepository } from "@/utils/base-repository";
import { FilterQuery, QueryOptions } from "mongoose";

class MetricRepository extends BaseRepository<IMetric> {
  constructor() {
    super(Metric);
  }

  public async create(data: Partial<IMetric>): Promise<IMetric> {
    return this.model.create(data);
  }

  public async find(
    query: FilterQuery<IMetric>,
    options?: QueryOptions,
    projection?: any,
  ): Promise<IMetric[]> {
    return this.model.find(query, projection, options).exec();
  }
}

const metricRepository = new MetricRepository();

export default metricRepository;
