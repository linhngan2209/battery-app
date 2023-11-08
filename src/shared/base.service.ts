import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import {
  QueryWithHelpers,
  Types,
  Query,
  UpdateQuery,
} from 'mongoose';
import { BaseModel } from './base.model';

type QueryList<T extends BaseModel> = QueryWithHelpers<
  Array<DocumentType<T>>,
  DocumentType<T>
>;
type QueryItem<T extends BaseModel> = QueryWithHelpers<
  DocumentType<T>,
  DocumentType<T>
>;

export abstract class BaseService<T extends BaseModel> {
  protected model: ReturnModelType<AnyParamConstructor<T>>;

  protected constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this.model = model;
  }

  protected static throwMongoError(err: Error): void {
    throw err;
  }

  protected static toObjectId(id: string): Types.ObjectId {
    try {
      return new Types.ObjectId(id);
    } catch (e) {
      this.throwMongoError(e);
    }
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  findAll(filter = {}): QueryList<T> {
    return this.model.find(filter);
  }

  async findAllAsync(filter = {}): Promise<Array<DocumentType<T>>> {
    try {
      return await this.findAll(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  findOne(filter = {}): QueryItem<T> {
    return this.model.findOne(filter);
  }

  async findOneAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this.findOne(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  findById(id: string): QueryItem<T> {
    return this.model.findById(BaseService.toObjectId(id));
  }

  async findByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this.findById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }



  

  delete(filter = {}): QueryItem<T> {
    return this.model.findOneAndDelete(filter);
  }

  async deleteAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this.delete(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  deleteById(id: string): QueryItem<T> {
    return this.model.findByIdAndDelete(BaseService.toObjectId(id));
  }

  async deleteByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this.deleteById(id).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  update(item: UpdateQuery<T>): QueryItem<T> {
    return this.model.findByIdAndUpdate(BaseService.toObjectId(item.id), item, {
      new: true,
    });
  }

  async updateAsync(item: T): Promise<DocumentType<T>> {
    try {
      return await this.update(item).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

 
}
