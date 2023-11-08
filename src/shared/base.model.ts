import { modelOptions, prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';

@modelOptions({
  schemaOptions: {
    minimize: false,
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
  },
})
export abstract class BaseModel {
  @prop()
  createdDate?: Date; // provided by timestamps
  @prop()
  updatedDate?: Date; // provided by timestamps
  id?: string; // is actually model._id getter

  @Exclude()
  // tslint:disable-next-line: variable-name
  _id?: string;

  @Exclude()
  // tslint:disable-next-line: variable-name
  __v?: number;

  @Expose()
  get uuid(): string {
    return this._id.toString();
  }

  constructor(partial: Partial<BaseModel>) {
    Object.assign(this, partial);
  }
}
