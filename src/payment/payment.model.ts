import { prop } from '@typegoose/typegoose';

export class Payment {
    @prop({ required: true })
    phoneNumber: string;
  
    @prop()
    price: number
  
    @prop()
    totalTime: number;

    @prop()
    walletBalance: number
   
  }
  
