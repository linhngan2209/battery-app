import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './authentication/authentication.module';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ChargingStationModule } from './manage-charging/charging-station.module';
import { ControlDeviceModule } from './control-device/control-device.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [TypegooseModule.forRoot("mongodb+srv://linhngan220902:nganptlhe2209@rogo.duvlawh.mongodb.net/batteryApp"), ChargingStationModule,ControlDeviceModule,PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
