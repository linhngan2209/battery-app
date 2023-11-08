import {Injectable, Res, BadRequestException, Logger} from '@nestjs/common'
import { Response } from 'express';
import { Booking } from './control-device.model';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { Model } from 'mongoose';
import { ChargingStation } from 'src/manage-charging/charging-station.model';
import { Payment } from 'src/payment/payment.model';



@Injectable()
export class ControlDeviceService {
    constructor( @InjectModel(Booking) private readonly bookingModel : Model<Booking>,
    @InjectModel(ChargingStation) private readonly chargingModel : Model<ChargingStation>,
    @InjectModel(Payment) private readonly paymentModel : Model<Payment>,
    ) {}

    async controlDevice(@Res() res: Response,status : string,phone: string,time: string,aboutTime: number) {
            const booking =await this.bookingModel.findOne({phoneNumber:phone})
            const slot=booking.slot
            let newBooking: any = {};
            if (status === 'off') {
                res.redirect(307, `http://172.20.10.2/on${slot}`);
                newBooking.status='Done'
                newBooking.timeOut=time
                newBooking.aboutTime=aboutTime
                let payment = await this.paymentModel.findOneAndUpdate(
                  { phoneNumber: phone },
                  { $inc: { totalTime: aboutTime } },
                  { upsert: true, new: true }
                );
                const updatedChargingStation = await this.chargingModel.findOneAndUpdate({stationName: booking.stationName},{$pull:{bookedPosition: slot}}, {new: true})
                await this.chargingModel.findOneAndUpdate({stationName: booking?.stationName}, {$set: { filledSlots: updatedChargingStation.bookedPosition.length}})
              } else if (status === 'on') {
                res.redirect(307, `http://172.20.10.2/off${slot}`);
                newBooking.status='Active'
                newBooking.timeIn=time
              } else {
                res.status(400).send('Invalid signal.');
              }
              await this.bookingModel.findOneAndUpdate(
                { phoneNumber: phone},
                {
                  $set: newBooking,
                },
                {
                  new: true,
                  upsert: true,
                },
              );     
    }
    async insertBooking(phoneNumber: string, stationName: string, slot: number){
        try {
            let newBooking: any = {};
            newBooking.phoneNumber = phoneNumber;
            newBooking.stationName = stationName;
            newBooking.slot = slot
            if(!newBooking.status){
                newBooking.status='Booking'
            }
            await this.bookingModel.findOneAndUpdate(
              { phoneNumber: newBooking.phoneNumber},
              {
                $set: newBooking,
              },
              {
                new: true,
                upsert: true,
              },
            );
            
            const updatedChargingStation = await this.chargingModel.findOneAndUpdate(
              { stationName: stationName },
              {
                $addToSet: { bookedPosition: slot },
              },
              { new: true, upsert: true }
            );
            const updatedFilledSlots = await this.chargingModel.findOneAndUpdate(
              {stationName: stationName},
              {
                $set: { filledSlots: updatedChargingStation.bookedPosition.length}
              },
              {upsert: true}
            )
          
          } catch (error) {
            Logger.error(error);
            return;
          }
    }


}
