import { prop } from '@typegoose/typegoose';


export class Booking {
  @prop({ required: true })
  phoneNumber: string;

  @prop({ required: true })
  stationName: string;

  @prop({ required: true})
  slot: number;

  @prop({ required: true})
  status: string;

  @prop()
  timeIn: string;
  
  @prop()
  timeOut: string;

  @prop()
  aboutTime: number;

 
}

  
