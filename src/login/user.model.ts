import { prop } from '@typegoose/typegoose';

export class User {
    @prop({ required: true })
    username: string;
  
    @prop({ required: true })
    password: string
  
    @prop({ required: true })
    phonenumber: string;

    @prop({ required: true })
    brand: string
    @prop()
    licenseplate: string
    @prop()
    price: number 
   

  }
  
