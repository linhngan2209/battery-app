import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/shared/base.model';

export class ChargingStation {
  @prop({ required: true })
  stationName: string;

  @prop({ required: true })
  location: string;

  @prop({ required: true})
  totalSlots: number;

  @prop({ required: true})
  filledSlots: number;

  @prop({ required: true})
  operatingHours: string;
  
  @prop()
  bookedPosition: Number[];

 
}
