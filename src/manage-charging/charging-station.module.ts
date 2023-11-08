import { Module } from '@nestjs/common';
import { ChargingStationController } from './charging-station.controller';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './charging-station.model';
import { TypegooseModule } from '@m8a/nestjs-typegoose';


@Module({
  imports: [TypegooseModule.forFeature([ChargingStation])],
  controllers: [ChargingStationController],
  providers: [ChargingStationService]
})
export class ChargingStationModule {}