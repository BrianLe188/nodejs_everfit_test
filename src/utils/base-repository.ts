import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

export interface IBaseDocument extends Document {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseRepository<T extends IBaseDocument> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  public async find(
    query: FilterQuery<T>,
    options?: QueryOptions,
    projection?: any,
  ): Promise<T[]> {
    return this.model.find(query, projection, options).exec();
  }

  public async findByIdAndUpdate(
    id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true, ...options })
      .exec();
  }

  public async findOneAndUpdate(
    query: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(query, data, { new: true, ...options })
      .exec();
  }

  public async updateMany(
    query: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<any> {
    return this.model.updateMany(query, data).exec();
  }

  public async findByIdAndDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  public async findOneAndDelete(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(query).exec();
  }

  public async deleteMany(query: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(query).exec();
  }

  public async countDocuments(query: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(query).exec();
  }
}
