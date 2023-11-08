import { Module } from '@nestjs/common';

import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ControlDevicenController } from './control-device.controller';
import { ControlDeviceService } from './control-device.service';
import { Booking } from './control-device.model';
import { ChargingStation } from 'src/manage-charging/charging-station.model';
import { Payment } from 'src/payment/payment.model';


@Module({
  imports: [TypegooseModule.forFeature([Booking,ChargingStation,Payment])],
  controllers: [ControlDevicenController],
  providers: [ControlDeviceService]
})
export class ControlDeviceModule {}